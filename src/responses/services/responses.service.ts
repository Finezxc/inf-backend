import { BadRequestException, Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ConfigService } from '@nestjs/config';
import {
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedQueryDto } from 'common/dto/paginated-query.dto';
import { RequestRepository } from 'requests/repositories/requests.repository';
import { RequestStatusEnum } from 'common/enums/request-status.enum';
import { SpecificCategoryRepository } from 'categories/repositories/specific-category.repository';
import { AdminPaymentSettingsEntity } from 'db/entities/admin-payment-settings.entity';
import { UtilsService } from 'common/services/utils.service';
import { ResponseRepository } from 'responses/repositories/response.repository';
import { ResponsesSubmissionDto } from 'responses/dto/response-submission.dto';
import { StorageService } from 'storage/services/storage.service';
import { bufferToStream } from 'common/utils/bufferToStream';
import { BucketStoragePathsEnum } from 'storage/enums/bucket-storage-paths.enum';
import { ResponseOfResponderResponse } from 'responses/responses/get-all-responses.response';
import { IdType } from 'common/types/id-type.type';
import { ResponseRatingDto } from 'responses/dto/response-rating.dto';
import { ResponseDecisionDto } from 'responses/dto/response-decision.dto';
import { VerificationEntity } from 'db/entities/verification.entity';
import { UserRepository } from 'account/repositories/user.repository';
import { ResponseAttachmentDocumentRepository } from '../repositories/response-attachment-document.repository';
import { ResponseType } from 'common/types/response.type';
import { ResponseUploadTemplateDto } from '../dto/response-upload-template.dto';
import { ResponseTemplateRepository } from '../repositories/response-template.repository';
import { UserPayload } from '../../common/types/user-payload.type';
import { ResponseOwnershipTypesService } from '../../response-ownership-types/services/response-ownership-types.services';
import { CitationTypesService } from '../../citation-types/services/citation-types.service';
import { CitationService } from '../../citations/services/citation.service';
import { ResponseEntity } from '../../db/entities/response.entity';
import { AppErrors } from '../../common/constansts/app.errors';
import { StatusResponse } from '../../account/responses/status.response';
import { RequestStatusEntity } from '../../db/entities/request-status.entity';

@Injectable()
export class ResponsesService {
  constructor(
    private responsesRepo: ResponseRepository,
    private responseAttachmentDocumentsRepo: ResponseAttachmentDocumentRepository,
    private requestsRepo: RequestRepository,
    private storageService: StorageService,
    private userRepo: UserRepository,
    private specificCategoryRepo: SpecificCategoryRepository,
    private utilsService: UtilsService,
    private configService: ConfigService,
    @InjectRepository(AdminPaymentSettingsEntity)
    private settingsRepo: Repository<AdminPaymentSettingsEntity>,
    @InjectRepository(VerificationEntity)
    private verificationRepo: Repository<VerificationEntity>,
    private responseTemplateRepo: ResponseTemplateRepository,
    private readonly responseOwnershipTypesService: ResponseOwnershipTypesService,
    private readonly citationTypesService: CitationTypesService,
    private readonly citationService: CitationService,
  ) {}

  async responseFormFields() {
    const justifications =
      await this.responseOwnershipTypesService.getResponseOwnershipTypes();
    const citations = await this.citationTypesService.getCitationTypes();
    return {
      justifications,
      citations,
    };
  }

  @Transactional()
  async submitResponse(
    user: UserPayload,
    responsesSubmissionDto: ResponsesSubmissionDto,
  ): Promise<ResponseEntity> {
    const request = await this.requestsRepo.findOneOrFail(
      responsesSubmissionDto.requestId,
      {
        where: { status: RequestStatusEnum.Approved },
        relations: ['responses', 'responses.user'],
      },
    );
    request.responses.map((response) => {
      if (response.user.id === user.id) {
        throw new BadRequestException(
          AppErrors.USER_HAS_ALREADY_ANSWERED_THIS_REQUEST,
        );
      }
    });

    const requestExpired = this.utilsService.checkIfExpired(
      request.createdAt,
      request.timeLimit,
    );
    if (requestExpired) {
      throw new BadRequestException(
        AppErrors.TIME_LIMIT_FOR_THIS_REQUEST_HAS_ALREADY_EXPIRED,
      );
    }

    const stream = bufferToStream(responsesSubmissionDto.attachmentFile.buffer);
    const file = await this.storageService.upload({
      fileName: responsesSubmissionDto.attachmentFile.originalName,
      storagePath: BucketStoragePathsEnum.responseAttachments,
      fileStream: stream,
    });

    runOnTransactionRollback(async () => {
      if (file) {
        await this.storageService.remove(file);
      }
    });
    const response = this.responsesRepo.create({
      assignedReward: request.reward,
      request: { id: request.id },
      user: { id: user.id },
      storageItem: file,
      justificationId: responsesSubmissionDto.justificationId,
      price: Number(responsesSubmissionDto.price),
    });

    const newResponse = await this.responsesRepo.save(response);
    const citations = [];
    responsesSubmissionDto.citations.map((citation) => {
      citation.citationFields.map((field) => {
        citations.push({
          value: field.value,
          citationFieldId: field.id,
          citationTypeId: citation.citationId,
          responseId: newResponse.id,
        });
      });
    });
    await this.citationService.createCitations(citations);
    newResponse.citations =
      await this.citationService.getAllCitationByResponseId(newResponse.id);
    return newResponse;
  }

  async getAllResponderResponses(
    user: UserPayload,
    paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<ResponseOfResponderResponse>> {
    const totalInfo = await paginate(this.responsesRepo, paginatedQueryDto, {
      where: { user: { id: user.id } },
      relations: [
        'request',
        'responderPaymentStrategy',
        'verification',
        'user',
      ],
    });

    const items = totalInfo.items.map((response) => {
      return ResponseOfResponderResponse.fromResponse(response);
    });

    const meta = totalInfo.meta;

    return { items, meta };
  }

  async getResponseInfo(userId: number, id: IdType): Promise<ResponseEntity> {
    const response = await this.responsesRepo.findOne({
      where: { id, user: { id: userId } },
      relations: [
        'request',
        'justification',
        'storageItem',
        'request.categories',
        'request.responses',
      ],
    });

    response.request.numberOfResponses = response.request.responses.length;
    delete response.request.responses;
    response.citations = await this.citationService.getAllCitationByResponseId(
      response.id,
    );
    return response;
  }

  @Transactional()
  async downloadResponseAttachment(
    userId: number,
    id: IdType,
    response: ResponseType,
  ) {
    const { storageItem } = await this.getResponseInfo(userId, id);
    response.setHeader('Content-Disposition', storageItem.originalFileName);
    const stream = this.storageService.createReadStream(storageItem);

    stream.pipe(response);
  }

  @Transactional()
  async downloadResponseTemplate(response: ResponseType): Promise<void> {
    const template = await this.responseTemplateRepo.findOne({
      relations: ['storageItem'],
    });

    if (!template) {
      throw new BadRequestException("Response template doesn't exists");
    }

    response.setHeader(
      'Content-Disposition',
      template.storageItem.originalFileName,
    );

    const stream = this.storageService.createReadStream(template.storageItem);

    stream.pipe(response);
  }

  @Transactional()
  async uploadResponseTemplate(
    responseUploadTemplateDto: ResponseUploadTemplateDto,
  ): Promise<void> {
    const templateExists = await this.responseTemplateRepo.findOne();

    if (templateExists) {
      throw new BadRequestException('Response template already exists');
    }

    const stream = bufferToStream(responseUploadTemplateDto.template.buffer);

    const file = await this.storageService.upload({
      fileName: responseUploadTemplateDto.template.originalName,
      storagePath: BucketStoragePathsEnum.responseTemplate,
      fileStream: stream,
    });

    runOnTransactionRollback(async () => {
      if (file) {
        await this.storageService.remove(file);
      }
    });

    const responseTemplate = this.responseTemplateRepo.create({
      storageItem: file,
    });

    await this.responseTemplateRepo.save(responseTemplate);
  }

  async rateResponse({ responseId, rating }: ResponseRatingDto): Promise<void> {
    const response = await this.responsesRepo.findOneOrFail(responseId, {
      relations: ['user'],
    });
    response.rating = rating;
    await this.responsesRepo.save(response);
    const responder = await this.userRepo.findOne({
      where: { id: response.user.id },
    });
    if (responder.rating > 0) {
      responder.rating = Math.floor((responder.rating + rating) / 2);
    } else {
      responder.rating = rating;
    }
    await this.userRepo.save(responder);
  }

  async decideOnResponse(
    user: UserPayload,
    responseDecisionDto: ResponseDecisionDto,
  ): Promise<StatusResponse> {
    const response = await this.getResponse(responseDecisionDto.responseId);
    if (response.verification) {
      throw new BadRequestException(
        AppErrors.THIS_RESPONSE_WAS_ALREADY_VERIFIED,
      );
    }
    const verification = this.verificationRepo.create({
      verificationResult: responseDecisionDto.decision,
      assignedReward: responseDecisionDto.reward
        ? responseDecisionDto.reward
        : response.assignedReward,
      user: { id: user.id },
    });
    await this.verificationRepo.save(verification);

    response.verification = {
      id: verification.id,
    } as VerificationEntity;

    await this.setStatusResponses(response, responseDecisionDto.decision);
    return { status: true };
  }

  private async setStatusResponses(
    response: ResponseEntity,
    decision: boolean,
  ): Promise<void> {
    response.status = decision;
    await this.responsesRepo.save(response);
    if (response.status === true) {
      const request = response.request;
      request.status = {
        id: RequestStatusEnum.Completed,
      } as RequestStatusEntity;
      await this.requestsRepo.save({
        id: request.id,
        status: {
          id: RequestStatusEnum.Completed,
        },
      });
    }
  }

  public async getAllResponses(paginated: PaginatedQueryDto) {
    return await paginate(this.responsesRepo, paginated, {
      relations: [
        'request',
        'responderPaymentStrategy',
        'verification',
        'user',
      ],
    });
  }

  async getResponse(id: number): Promise<ResponseEntity> {
    const response = await this.responsesRepo.findOneOrFail({
      where: { id },
      relations: [
        'request',
        'justification',
        'storageItem',
        'verification',
        'request.categories',
        'request.responses',
      ],
    });

    response.request.numberOfResponses = response.request.responses.length;
    response.citations = await this.citationService.getAllCitationByResponseId(
      response.id,
    );
    return response;
  }
}
