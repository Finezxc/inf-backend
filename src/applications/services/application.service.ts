import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';
import type { Readable } from 'stream';
import { Pagination } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate';

import { UserApprovalStatusEnum } from 'common/enums/user-approval-status.enum';
import { bufferToStream } from 'common/utils/bufferToStream';
import { BucketStoragePathsEnum } from 'storage/enums/bucket-storage-paths.enum';
import { StorageService } from 'storage/services/storage.service';
import { UserRepository } from 'account/repositories/user.repository';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { VerifierStatusApplicationDto } from 'applications/dto/application-for-verifier-status.dto';
import { VerifierCredentialDocument } from 'db/entities/verifier-credential-document.entity';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { VerifierApplicationResponse } from 'applications/responses/verifier-application.response';
import { PaginatedQueryDto } from 'common/dto/paginated-query.dto';
import { VerifierStatusDecisionDto } from 'applications/dto/decision-verifier-status.dto';
import { UserRoleEntity } from 'db/entities/user-role.entity';
import { MailingService } from 'mailing/services/mailing.service';
import { StatusResponse } from '../../account/responses/status.response';

@Injectable()
export class ApplicationService {
  constructor(
    private userRepo: UserRepository,
    private storageService: StorageService,
    private mailingService: MailingService,
  ) {}

  @Transactional()
  async applyForVerifierStatus(
    user_id: number,
    verifierStatusApplicationDto: VerifierStatusApplicationDto,
  ): Promise<Record<string, number>> {
    const user = await this.userRepo.findOneOrFail({
      where: { id: user_id },
      relations: ['approvalStatus'],
    });

    if (Number(user.approvalStatus.id) !== UserApprovalStatusEnum.Approved) {
      throw new NotFoundException('This user does not have "approved" status.');
    }

    if (
      user.roles.length > 1 ||
      (user.roles.length === 1 &&
        !user.roles.some((role) => Number(role.id) === UserRoleEnum.Responder))
    ) {
      throw new BadRequestException('Only Responders are allowed to apply.');
    }

    const credentialDocumentStorageItems =
      await this.storageService.uploadMultiple(
        verifierStatusApplicationDto.credentialDocuments.map((document) => {
          const stream = bufferToStream(document.file.buffer);
          return {
            fileName: document.file.originalName,
            fileStream: stream as Readable,
            storagePath: BucketStoragePathsEnum.verifierConfirmationDocuments,
          };
        }),
      );

    runOnTransactionRollback(async () => {
      if (
        credentialDocumentStorageItems &&
        credentialDocumentStorageItems.length > 0
      ) {
        await this.storageService.removeMultiple(
          credentialDocumentStorageItems,
        );
      }
    });

    const { linkedInProfileUrl, credentialDocuments, expertiseKeywordIds } =
      verifierStatusApplicationDto;
    user.linkedInProfileUrl = linkedInProfileUrl;

    user.expertiseKeywords = expertiseKeywordIds?.map(
      (id) => ({ id } as ExpertiseKeywordEntity),
    );
    user.verifierCredentialDocuments = credentialDocuments.map(
      (document, index) =>
        ({
          description: document.description,
          title: document.title,
          documentType: { id: document.documentTypeId },
          storageItem: credentialDocumentStorageItems[index],
        } as VerifierCredentialDocument),
    );

    await this.userRepo.save({
      ...user,
      approvalStatus: { id: UserApprovalStatusEnum.VerifierPending },
    });
    return { status: UserApprovalStatusEnum.VerifierPending };
  }

  async getVerifierApplications({
    ...rest
  }: PaginatedQueryDto): Promise<Pagination<VerifierApplicationResponse>> {
    return paginate(this.userRepo, rest, {
      where: { approvalStatus: UserApprovalStatusEnum.VerifierPending },
      select: ['firstName', 'lastName', 'id', 'approvalStatus'],
      relations: ['approvalStatus'],
    });
  }

  async decideOnVerifierStatus({
    decision,
    id,
  }: VerifierStatusDecisionDto): Promise<StatusResponse> {
    const user = await this.userRepo.findOneOrFail({
      where: {
        id: id,
        approvalStatus: UserApprovalStatusEnum.VerifierPending,
      },
      relations: ['approvalStatus'],
    });

    if (decision === true) {
      user.roles.push({
        id: UserRoleEnum.Verifier,
      } as UserRoleEntity);
    }

    await this.userRepo.save({
      ...user,
      approvalStatus: { id: UserApprovalStatusEnum.Approved },
    });

    await this.mailingService.sendVerifierStatusLetter(user);
    return { status: decision };
  }

  async verifierInfo(id) {
    return this.userRepo.findOneOrFail({
      where: { id },
      relations: [
        'approvalStatus',
        'verifierCredentialDocuments',
        'expertiseKeywords',
      ],
    });
  }
}
