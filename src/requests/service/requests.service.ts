import { BadRequestException, Injectable } from '@nestjs/common';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { PaginatedQueryDto } from 'common/dto/paginated-query.dto';
import { RequestRepository } from 'requests/repositories/requests.repository';
import { RequestsSubmissionDto } from 'requests/dto/requests-submission.dto';
import { RequestStatusEnum } from 'common/enums/request-status.enum';
import { SpecificCategoryRepository } from 'categories/repositories/specific-category.repository';
import { AdminPaymentSettingsEntity } from 'db/entities/admin-payment-settings.entity';
import { RequestDecisionDto } from 'requests/dto/request-decision.dto';
import { RequestStatusEntity } from 'db/entities/request-status.entity';
import { SubmittedRequestResponse } from 'requests/responses/submitted-request.response';
import { ApprovedRequestResponse } from 'requests/responses/approved-request.response';
import { UserEntity } from 'db/entities/user.entity';
import { IdType } from 'common/types/id-type.type';
import { UtilsService } from 'common/services/utils.service';
import { UserPayload } from '../../common/types/user-payload.type';
import { RequestEntity } from '../../db/entities/request.entity';
import { PlatformSettingsEntity } from '../../db/entities/platform-settings.entity';
import { Settings } from '../../common/settings';
import { CategoryRepository } from '../../categories/repositories/category.repository';
import { UsersService } from '../../users/services/users.service';
import { AvailabilityStatus } from '../../common/constansts/availability-status';
import { plainToClass } from 'class-transformer';
import { RequestResponse } from '../responses/request.response';
import { AppErrors } from '../../common/constansts/app.errors';
import { CitationService } from '../../citations/services/citation.service';
import { ResponseEntity } from '../../db/entities/response.entity';

@Injectable()
export class RequestsService {
  constructor(
    private requestsRepo: RequestRepository,
    private specificCategoryRepo: SpecificCategoryRepository,
    private utilsService: UtilsService,
    @InjectRepository(AdminPaymentSettingsEntity)
    private settingsRepo: Repository<AdminPaymentSettingsEntity>,
    @InjectRepository(PlatformSettingsEntity)
    private readonly platformSettingsRepo: Repository<PlatformSettingsEntity>,
    private readonly categoryRepository: CategoryRepository,
    private readonly usersService: UsersService,
    private readonly citationService: CitationService,
  ) {}

  async availableRequest(id: number): Promise<RequestEntity> {
    const request = await this.requestsRepo.findOne({
      where: { id },
      relations: [
        'responses',
        'responses.user',
        'expertiseKeywords',
        'categories',
        'status',
      ],
    });
    request.numberOfResponses = request.responses.length;
    return request;
  }

  async availableRequests(
    paginated: PaginatedQueryDto,
  ): Promise<Pagination<RequestEntity>> {
    const requests = await paginate(this.requestsRepo, paginated, {
      relations: ['responses', 'expertiseKeywords', 'categories', 'status'],
    });
    const answeredRequests = [];
    requests.items
      .filter((request) => !!request.responses.length)
      .map((request) => {
        request.numberOfResponses = request.responses.length;
        delete request.responses;
        answeredRequests.push({
          ...request,
        });
      });

    const meta = requests.meta;

    return { items: answeredRequests, meta };
  }

  async getRequests(user_id: number): Promise<RequestEntity[]> {
    return this.requestsRepo.find({ requesterId: user_id });
  }

  async getRequestById(id: IdType): Promise<RequestEntity> {
    return this.requestsRepo.findOneOrFail(
      { id },
      {
        select: [
          'id',
          'requesterId',
          'title',
          'description',
          'reward',
          'createdAt',
          'timeLimit',
        ],
        relations: ['status', 'categories', 'currencies'],
      },
    );
  }

  async getRequest(user_id: number, id: number): Promise<RequestEntity> {
    return this.requestsRepo.findOneOrFail({
      relations: [
        'status',
        'verifier',
        'responses',
        'categories',
        'responses.verification',
        'currencies',
      ],
      where: { requesterId: user_id, id },
    });
  }

  async submitRequest(
    user: UserPayload,
    {
      title,
      description,
      inflationAdjustmentYears,
      currencies,
      categories,
      expertiseKeywordIds,
    }: RequestsSubmissionDto,
  ): Promise<RequestEntity> {
    const defaultSettings = await this.settingsRepo.findOneOrFail({
      isCurrent: true,
    });

    const timeLimit = await this.platformSettingsRepo.findOneOrFail(
      Settings.time_limits,
    );
    const newRequest = this.requestsRepo.create({
      requesterId: user.id,
      title,
      description,
      currencies,
      status: { id: RequestStatusEnum.Submitted },
      inflationAdjustmentYears,
      reward: defaultSettings.defaultReward,
      timeLimit: timeLimit.value,
      expertiseKeywords: expertiseKeywordIds?.map(
        (id) => ({ id } as ExpertiseKeywordEntity),
      ),
      categories: await this.categoryRepository.getCategoriesByIds(categories),
    });
    return this.requestsRepo.save(newRequest);
  }

  async decideOnRequestStatus(
    requestDecisionDto: RequestDecisionDto,
    user: UserPayload,
  ): Promise<RequestEntity> {
    const request = await this.requestsRepo.findOneOrFail({
      where: {
        id: requestDecisionDto.id,
        status: RequestStatusEnum.Submitted,
      },
      relations: ['status'],
    });
    const requestExpired = this.utilsService.checkIfExpired(
      request.createdAt,
      request.timeLimit,
    );
    if (requestExpired) {
      throw new BadRequestException(
        'The time limit for this request has already expired',
      );
    }
    if (request.verifier) {
      throw new BadRequestException(
        'This request is already assigned to verifier',
      );
    }

    if (requestDecisionDto.decision === true) {
      request.status = {
        id: RequestStatusEnum.Approved,
      } as RequestStatusEntity;
      request.reward = requestDecisionDto.reward;
      request.timeLimit = requestDecisionDto.timeLimit;
    } else {
      request.status = {
        id: RequestStatusEnum.Rejected,
      } as RequestStatusEntity;
    }
    request.verifier = { id: user.id } as UserEntity;
    return this.requestsRepo.save(request);
  }

  async getSubmittedRequests(
    paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<SubmittedRequestResponse>> {
    return paginate(this.requestsRepo, paginatedQueryDto, {
      where: { status: RequestStatusEnum.Submitted },
      select: [
        'id',
        'requesterId',
        'title',
        'description',
        'reward',
        'createdAt',
        'timeLimit',
      ],
      relations: ['status', 'categories', 'currencies'],
    });
  }

  async getApprovedRequests(
    userId: number,
    paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<ApprovedRequestResponse>> {
    const requests = await this.getRequestsPaginated(
      paginatedQueryDto,
      {
        status: RequestStatusEnum.Approved,
      },
      ['status', 'categories', 'responses', 'responses.user'],
    );
    const user = await this.usersService.getUserById(userId);
    requests.items.map((request) => {
      request.availabilityStatus =
        request.categories.filter((val) => {
          return user.categories.find((category) => category.id === val.id);
        }).length !== 0
          ? AvailabilityStatus.AVAILABLE
          : AvailabilityStatus.UNAVAILABLE;

      const ownResponse = request.responses.find(
        (response) => response.user.id === userId,
      );
      request.pending = !!ownResponse;
      if (ownResponse) {
        request.ownResponse = {
          id: ownResponse.id,
          status: ownResponse.status,
        } as ResponseEntity;
      }
      delete request.responses;
    });
    return requests;
  }

  async getCompletedRequests(
    userId: number,
    paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<RequestEntity>> {
    const requests = await this.getRequestsPaginated(
      paginatedQueryDto,
      {
        status: RequestStatusEnum.Completed,
      },
      ['status', 'categories', 'responses', 'responses.user'],
    );
    const items = requests.items.filter((request) => {
      return request.responses.find(
        (response) => response.user.id === userId && response.status,
      );
    });
    items.map((item) => {
      delete item.responses;
    });
    return { items, meta: requests.meta };
  }

  //TODO: avoid using counter, instead return the length of visitors arr

  async getRequestInfo(userId: number, id: IdType): Promise<RequestResponse> {
    const request = await this.requestsRepo.findOneOrFail(id, {
      where: { status: Not(RequestStatusEnum.Submitted) },
      relations: [
        'status',
        'categories',
        'visitors',
        'responses',
        'responses.user',
        'responses.justification',
        'responses.storageItem',
      ],
    });
    if (!request) {
      throw new BadRequestException(
        AppErrors.THIS_REQUEST_HAS_NOT_BEEN_APPROVED_YET,
      );
    }
    const alreadyVisited = this.utilsService.checkIfAlreadyVisited(
      request.visitors,
      userId,
    );
    if (!alreadyVisited) {
      request.visitors.push({
        id: userId,
      } as UserEntity);
      request.requestViews++;
      await this.requestsRepo.save(request);
    }
    request.numberOfResponses = request.responses.length;
    const user = await this.usersService.getUserById(userId);
    request.availabilityStatus =
      request.categories.filter((val) => {
        return user.categories.find((category) => category.id === val.id);
      }).length !== 0
        ? AvailabilityStatus.AVAILABLE
        : AvailabilityStatus.UNAVAILABLE;
    if (request.status.id === RequestStatusEnum.Completed) {
      const verifiedResponse = request.responses.find(
        (response) => response.status === true,
      );
      verifiedResponse.citations =
        await this.citationService.getAllCitationByResponseId(
          verifiedResponse.id,
        );
      request.verifiedResponse = verifiedResponse;
    }
    request.responses.map(async (item) => {
      if (item.user.id === userId) {
        request.ownResponse = item;
      }
    });
    if (request.ownResponse) {
      request.ownResponse.citations =
        await this.citationService.getAllCitationByResponseId(
          request.ownResponse.id,
        );
    }
    return plainToClass(RequestResponse, request);
  }

  async getUnclaimedRequests(
    paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<ApprovedRequestResponse>> {
    return this.getRequestsPaginated(
      paginatedQueryDto,
      {
        status: RequestStatusEnum.Submitted,
        verifier: null,
      },
      ['status', 'responses', 'categories'],
    );
  }

  async getClaimedRequestsWithResponses(
    user: UserPayload,
    paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<ApprovedRequestResponse>> {
    return this.getRequestsPaginated(
      paginatedQueryDto,
      {
        status: RequestStatusEnum.Approved,
        verifier: user.id,
      },
      ['status', 'responses', 'categories'],
    );
  }

  private async getRequestsPaginated(
    paginatedQueryDto: PaginatedQueryDto,
    where: Record<string, unknown>,
    relations: string[],
  ) {
    return paginate(this.requestsRepo, paginatedQueryDto, {
      where: where,
      select: [
        'id',
        'requesterId',
        'title',
        'description',
        'reward',
        'createdAt',
        'inflationAdjustmentYears',
        'requestViews',
        'timeLimit',
      ],
      relations,
    });
  }

  async getAllRequestResponses(user: UserPayload, id: IdType) {
    const requestResponses = await this.requestsRepo.findOne(id, {
      where: { verifier: user.id },
      relations: ['responses'],
    });
    if (!requestResponses) {
      throw new BadRequestException('The request must be claimed');
    }
    return requestResponses.responses;
  }
}
