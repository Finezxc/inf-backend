import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StorageService } from 'storage/services/storage.service';
import { ResponseType } from 'common/types/response.type';
import { IdType } from 'common/types/id-type.type';
import { ResponderCredentialDocument } from 'db/entities/responder-credential-document.entity';
import { UserRepository } from 'account/repositories/user.repository';
import { VerifierCredentialDocument } from 'db/entities/verifier-credential-document.entity';
import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';
import { UserEntity } from 'db/entities/user.entity';
import { UsersListResponse } from 'users/responses/users-list.response';
import { UsersInfoResponse } from 'users/responses/user-info.response';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { SessionsService } from 'auth/services/sessions.service';
import { UserRoleEntity } from 'db/entities/user-role.entity';
import { UserApprovalStatusEnum } from 'common/enums/user-approval-status.enum';
import { MailingService } from 'mailing/services/mailing.service';
import { CredentialDocumentTypesService } from '../../credential-document-types/services/credential-document-types.service';

@Injectable()
export class UsersService {
  constructor(
    private storageService: StorageService,
    @InjectRepository(ResponderCredentialDocument)
    private responderDocumentsRepo: Repository<ResponderCredentialDocument>,
    @InjectRepository(VerifierCredentialDocument)
    private verifierDocumentsRepo: Repository<VerifierCredentialDocument>,
    private userRepo: UserRepository,
    private sessionsService: SessionsService,
    private mailingService: MailingService,
    private readonly credentialDocumentTypesService: CredentialDocumentTypesService,
  ) {}

  async pipeResponderCredentialDocumentFile(
    responderCredentialDocumentId: IdType,
    response: ResponseType,
  ) {
    const document = await this.responderDocumentsRepo.findOneOrFail({
      where: { id: responderCredentialDocumentId },
      relations: ['storageItem'],
    });
    response.setHeader(
      'Content-Disposition',
      document.storageItem.originalFileName,
    );

    const stream = this.storageService.createReadStream(document.storageItem);

    stream.pipe(response);
  }

  async pipeVerifierCredentialDocumentFile(
    responderCredentialDocumentId: IdType,
    response: ResponseType,
  ) {
    const document = await this.verifierDocumentsRepo.findOneOrFail({
      where: { id: responderCredentialDocumentId },
      relations: ['storageItem'],
    });

    response.setHeader(
      'Content-Disposition',
      document.storageItem.originalFileName,
    );

    const stream = this.storageService.createReadStream(document.storageItem);

    stream.pipe(response);
  }

  async pipeProfilePicture(userId: IdType, response: ResponseType) {
    const user = await this.userRepo.findOneOrFail(userId);

    const stream = this.storageService.createReadStream(user.profilePicture);

    if (!stream) {
      response.status(200).json({});
    } else {
      stream.pipe(response);
    }
  }

  async getAllUsers({
    search,
    page,
    limit,
  }: PaginatedSearchDto): Promise<UsersListResponse> {
    const [list, count] = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where("user.firstName || ' ' || user.lastName ILike :search", {
        search: `%${search}%`,
      })
      .andWhere('roles.id != :id', { id: 1 })
      .andWhere('roles.name != :name', { name: 'Superadmin' })
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    const selectedInfo = list.map((user) => {
      return UsersListResponse.fromUser(user) as UserEntity;
    });
    return {
      selectedInfo,
      count,
      page,
      limit,
    };
  }

  async getUserInfo(userId: number): Promise<UsersInfoResponse> {
    const user = await this.findUser(userId);
    for (const document of user?.responderCredentialDocuments) {
      document.documentType =
        await this.credentialDocumentTypesService.getCredentialDocumentById(
          document.documentTypeId,
        );
      document.storageItem = await this.storageService.getById(
        document.storageItemId,
      );
      const responderDocument =
        await this.storageService.getResponderCredentialDocumentByStorageId(
          document.storageItem.id,
        );
      document.storageItem.storagePath += responderDocument.id;
    }
    for (const document of user?.verifierCredentialDocuments) {
      document.documentType =
        await this.credentialDocumentTypesService.getCredentialDocumentById(
          document.documentTypeId,
        );
      document.storageItem = await this.storageService.getById(
        document.storageItemId,
      );
      const verifierDocument =
        await this.storageService.getVerifierCredentialDocumentByStorageId(
          document.storageItem.id,
        );
      document.storageItem.storagePath += verifierDocument.id;
    }

    return UsersInfoResponse.fromUser(user);
  }

  async banUser(userId: number): Promise<void> {
    const bannedUser = await this.findUser(userId);
    if (
      bannedUser.roles.includes({ id: UserRoleEnum.Admin } as UserRoleEntity) ||
      bannedUser.roles.includes({
        id: UserRoleEnum.Superadmin,
      } as UserRoleEntity)
    ) {
      throw new BadRequestException('These users cannot be banned.');
    }
    await this.userRepo.save({
      ...bannedUser,
      approvalStatus: { id: UserApprovalStatusEnum.Banned },
    });
    await this.sessionsService.removeUserSessions();
    await this.mailingService.sendBannedUserLetter(bannedUser);
  }

  private async findUser(userId: number): Promise<UserEntity> {
    return await this.userRepo.findOneOrFail(userId, {
      relations: [
        'roles',
        'expertiseKeywords',
        'verifierCredentialDocuments',
        'responderCredentialDocuments',
        'profilePicture',
      ],
    });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return this.userRepo.findOneOrFail(id, { relations: ['categories'] });
  }
}
