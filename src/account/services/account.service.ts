import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';
import type { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAuthService } from 'auth/services/user-auth.service';
import { UserApprovalStatusEnum } from 'common/enums/user-approval-status.enum';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { SessionType } from 'common/types/session.type';
import { bufferToStream } from 'common/utils/bufferToStream';
import { BucketStoragePathsEnum } from 'storage/enums/bucket-storage-paths.enum';
import { StorageService } from 'storage/services/storage.service';
import {
  LoginAccountDto,
  RegisterAccountDto,
  RegistrationCompletionDto,
} from 'account/dto';
import { UserRepository } from 'account/repositories/user.repository';
import { MailingService } from 'mailing/services/mailing.service';
import { AccountResponse } from 'account/responses/account.response';
import { ResetPasswordDto } from 'account/dto/reset-password.dto';
import { CryptoUtilsService } from 'common/services/crypto-utils.service';
import { SessionsService } from 'auth/services/sessions.service';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { ResponderCredentialDocument } from 'db/entities/responder-credential-document.entity';
import { UpdateUserProfileDto } from 'account/dto/update-user-profile-dto';
import { StorageItemEntity } from 'db/entities/storage-item.entity';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';
import { UserRoleEntity } from 'db/entities/user-role.entity';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { SpecificCategoryRepository } from '../../categories/repositories/specific-category.repository';
import { IdType } from '../../common/types/id-type.type';
import { UserEntity } from '../../db/entities/user.entity';
import { UserPayload } from '../../common/types/user-payload.type';
import { JwtService } from '@nestjs/jwt';
import { CredentialDocumentTypesService } from '../../credential-document-types/services/credential-document-types.service';
import { CategoryRepository } from '../../categories/repositories/category.repository';

@Injectable()
export class AccountService {
  constructor(
    private userAuthService: UserAuthService,
    private userRepo: UserRepository,
    private storageService: StorageService,
    private mailingService: MailingService,
    private cryptoUtilsService: CryptoUtilsService,
    private sessionsService: SessionsService,
    private configService: ConfigService,
    private specificCategoryRepo: SpecificCategoryRepository,
    @InjectRepository(UserRoleEntity)
    private rolesRepo: Repository<UserRoleEntity>,
    private jwtService: JwtService,
    private readonly credentialDocumentTypesService: CredentialDocumentTypesService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  // TODO: transactions are applied only for TypeORM requests, use CLS hooks to rollback S3 request
  // TODO: add cron job which will delete user's files from s3 after a week of not confirming email
  @Transactional()
  async registerUser(
    registerUserDto: RegisterAccountDto,
  ): Promise<{ id: IdType; email: string }> {
    const existingUser = await this.userRepo.findOne({
      where: { email: registerUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with such email already exists.');
    }

    const passwordHash = await this.cryptoUtilsService.generateHash(
      registerUserDto.password,
    );

    const emailConfirmationToken = this.cryptoUtilsService.generateUUID();

    const { email } = registerUserDto;

    const user = this.userRepo.create({
      email,
      passwordHash,
      isEmailConfirmed: false,
      isRegistrationCompleted: false,
      emailConfirmationToken,
      rating: this.configService.get<number>(ConfigEnvEnum.APP_MAX_RATING),
      roles: [{ id: UserRoleEnum.Responder }],
      approvalStatus: { id: UserApprovalStatusEnum.Approved },
    });
    await this.mailingService.sendEmailConfirmationRequestLetter(
      user,
      emailConfirmationToken,
    );
    const result = await this.userRepo.save(user);
    return { id: result.id, email: result.email };
  }

  @Transactional()
  async completeRegistration(
    user_id: number,
    registerUserDto: RegistrationCompletionDto,
  ): Promise<UserEntity> {
    let credentialDocumentStorageItems;
    const user = await this.userRepo.findOne({
      where: { id: user_id, isRegistrationCompleted: false },
    });

    if (!user) {
      throw new NotFoundException(
        `User with such id and uncompleted registration not found.`,
      );
    }
    if (registerUserDto.credentialDocuments) {
      credentialDocumentStorageItems = await this.storageService.uploadMultiple(
        registerUserDto.credentialDocuments?.map((document) => {
          const stream = bufferToStream(document.file.buffer);

          return {
            fileName: document.file.originalName,
            fileStream: stream as Readable,
            storagePath: BucketStoragePathsEnum.responderConfirmationDocuments,
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
    }
    const {
      firstName,
      lastName,
      bio,
      location,
      birthDate,
      linkedInProfileUrl,
      cryptoCurrencyWalletAddress,
      jobTitle,
      credentialDocuments,
      expertiseKeywordIds,
      categories,
    } = registerUserDto;

    user.firstName = firstName;
    user.lastName = lastName;
    user.bio = bio;
    user.location = location;
    user.birthDate = birthDate;
    user.linkedInProfileUrl = linkedInProfileUrl;
    user.cryptoCurrencyWalletAddress = cryptoCurrencyWalletAddress;
    user.jobTitle = jobTitle;
    user.isRegistrationCompleted = true;

    user.expertiseKeywords = expertiseKeywordIds?.map(
      (id) => ({ id } as ExpertiseKeywordEntity),
    );

    if (credentialDocuments) {
      user.responderCredentialDocuments = credentialDocuments.map(
        (document, index) =>
          ({
            description: document.description,
            title: document.title,
            documentType: { id: document.documentTypeId },
            storageItem: credentialDocumentStorageItems[index],
          } as ResponderCredentialDocument),
      );
    }
    user.categories = await this.categoryRepository.getCategoriesByIds(
      categories,
    );
    return this.userRepo.save(user);
  }

  async confirmUserEmail(
    confirmationToken: string,
  ): Promise<Record<string, string>> {
    const user = await this.userRepo.findOneOrFail({
      emailConfirmationToken: confirmationToken,
      isEmailConfirmed: false,
    });

    user.isEmailConfirmed = true;

    await this.userRepo.save(user);
    return this.generateToken(user);
  }

  async login(loginUserDto: LoginAccountDto): Promise<Record<string, string>> {
    const user = await this.userAuthService.verifyLogin(
      loginUserDto.email,
      loginUserDto.password,
      ['expertiseKeywords', 'approvalStatus'],
    );

    if (!user) {
      throw new ForbiddenException('Email or password is invalid.');
    }

    if (!user.isEmailConfirmed) {
      throw new ForbiddenException(
        `You cannot log in to account with unconfirmed email.`,
      );
    }

    if (user.approvalStatus.id === UserApprovalStatusEnum.Banned) {
      throw new ForbiddenException('You are banned.');
    }
    return this.generateToken(user);
  }

  async logout(session: SessionType): Promise<void> {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getCurrentUser(userPayload: UserPayload): Promise<AccountResponse> {
    const user = await this.userRepo.findOne({
      where: { id: userPayload.id },
      relations: [
        'responses',
        'responderCredentialDocuments',
        'verifierCredentialDocuments',
        'categories',
      ],
    });
    user.rating = await this.getRating(user);
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

    return AccountResponse.fromUser(user);
  }

  @Transactional()
  async requestPasswordRestLetter(
    email: string,
  ): Promise<Record<string, boolean>> {
    const user = await this.userRepo.findOne({
      where: { email, isEmailConfirmed: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ${email} doesn't exist.`);
    }

    const confirmationToken = this.cryptoUtilsService.generateUUID();

    user.passwordResetConfirmationToken = confirmationToken;

    await this.userRepo.save(user);

    await this.mailingService.sendResetPasswordEmail(user, confirmationToken);
    return { status: true };
  }

  @Transactional()
  async resetPassword({
    confirmationToken,
    newPassword,
  }: ResetPasswordDto): Promise<Record<string, boolean>> {
    const user = await this.userRepo.findOne({
      where: {
        passwordResetConfirmationToken: confirmationToken,
      },
    });

    if (!user) {
      throw new BadRequestException(`Confirmation token is invalid.`);
    }

    user.passwordResetConfirmationToken = null;
    user.passwordHash = await this.cryptoUtilsService.generateHash(newPassword);

    await this.userRepo.save(user);

    await this.sessionsService.removeUserSessions();
    return { status: true };
  }

  @Transactional()
  async updateProfile(
    user_id: number,
    updateProfileDto: UpdateUserProfileDto,
  ): Promise<AccountResponse> {
    const user = await this.userRepo.findOneOrFail(user_id, {
      relations: ['profilePicture'],
    });

    const {
      firstName,
      lastName,
      bio,
      profilePictureFile,
      location,
      birthDate,
      linkedInProfileUrl,
      cryptoCurrencyWalletAddress,
      jobTitle,
      expertiseKeywordIds,
    } = updateProfileDto;

    user.firstName = firstName;
    user.lastName = lastName;
    user.bio = bio;
    user.location = location;
    user.birthDate = birthDate;
    user.linkedInProfileUrl = linkedInProfileUrl;
    user.cryptoCurrencyWalletAddress = cryptoCurrencyWalletAddress;
    user.jobTitle = jobTitle;

    user.expertiseKeywords = expertiseKeywordIds?.map(
      (id) => ({ id } as ExpertiseKeywordEntity),
    );

    let oldProfilePicture: StorageItemEntity;

    if (profilePictureFile) {
      const stream = bufferToStream(profilePictureFile.buffer);

      const newProfilePicture = await this.storageService.upload({
        fileName: profilePictureFile.originalName,
        storagePath: BucketStoragePathsEnum.profileImages,
        fileStream: stream,
      });

      oldProfilePicture = user.profilePicture;
      user.profilePicture = newProfilePicture;

      runOnTransactionRollback(async () => {
        if (newProfilePicture) {
          await this.storageService.remove(newProfilePicture);
        }
      });
    }

    await this.userRepo.save(user);

    if (oldProfilePicture && profilePictureFile) {
      await this.storageService.remove(oldProfilePicture, {
        removeFromDB: true,
      });
    }

    return AccountResponse.fromUser(user);
  }

  async getCurrentRoles(user: UserPayload): Promise<EnumItemResponse[]> {
    return this.rolesRepo
      .createQueryBuilder('roles')
      .leftJoin('roles.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  async generateToken(user: UserEntity): Promise<{ token: string }> {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getRating(user: UserEntity): Promise<number> {
    let sum = 0;
    let count = 0;
    user.responses.map((response) => {
      if (response.rating > 0) {
        count += 1;
        sum += response.rating;
      }
    });
    return count > 9 ? sum / count : user.rating;
  }
}
