import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional-cls-hooked';
import { DeepPartial, Not } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import type { Readable } from 'stream';

import { EvaluationRequestInterestRepository } from 'interests/repositories/evaluation-request-interest.repository';
import { CreateEvaluationRequestInterestDto } from 'interests/dto/create-evaluation-request-interest.dto';
import { CategoryRepository } from 'categories/repositories/category.repository';
import { CryptoUtilsService } from 'common/services/crypto-utils.service';
import { StorageService } from 'storage/services/storage.service';
import { BucketStoragePathsEnum } from 'storage/enums/bucket-storage-paths.enum';
import { bufferToStream } from 'common/utils/bufferToStream';
import { CreateEvaluationRequestInterestResponse } from 'interests/responses/create-evaluation-request-interest.response';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';
import { EvaluationRequestInterestEntity } from 'db/entities/evaluation-request-interect.entity';
import { MailingService } from 'mailing/services/mailing.service';
import { SpecificCategoryEntity } from 'db/entities/specific-category.entity';
import { LeaderBoardResponse } from 'interests/responses/leader-board.response';
import { IdType } from 'common/types/id-type.type';
import { ResponseType } from 'common/types/response.type';
import * as converter from 'json-2-csv';
import * as moment from 'moment';

const EVENT_END_DATE = new Date('2022-02-18T23:59:00.000Z');
@Injectable()
export class EvaluationRequestInterestService {
  constructor(
    private readonly evaluationRequestInterestEntityRepo: EvaluationRequestInterestRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly cryptoUtilService: CryptoUtilsService,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
    private readonly mailingService: MailingService,
  ) {}

  @Transactional()
  async create({
    assetDescription,
    assetName,
    categories,
    estimatedPrice,
    email,
    assetPictures = [],
    invitedBy,
    firstName,
  }: CreateEvaluationRequestInterestDto): Promise<CreateEvaluationRequestInterestResponse> {
    const specificCategories: DeepPartial<SpecificCategoryEntity>[] =
      categories.map((category) => ({
        category: {
          id: category.id,
        },
        userDefinedCategory: category.userDefinedCategory,
      }));

    let inviter: EvaluationRequestInterestEntity;

    if (invitedBy) {
      if (new Date().getTime() > EVENT_END_DATE.getTime()) {
        throw new BadRequestException('Unfortunately event is finished.');
      }

      inviter = await this.evaluationRequestInterestEntityRepo.findOne({
        where: {
          referralCode: invitedBy,
          email: Not(email),
        },
      });

      if (inviter) {
        inviter.referralUsagesCounter++;
      }
    }

    const referralCode = this.cryptoUtilService.generateUUID();

    const storageItems = await this.storageService.uploadMultiple(
      assetPictures.map((file) => {
        const stream = bufferToStream(file.buffer);

        return {
          fileName: file.originalName,
          fileStream: stream as Readable,
          storagePath: BucketStoragePathsEnum.evaluationRequestInterestImages,
        };
      }),
    );

    runOnTransactionRollback(async () => {
      if (storageItems.length > 0) {
        await this.storageService.removeMultiple(storageItems);
      }
    });

    const evaluationRequestInterest =
      this.evaluationRequestInterestEntityRepo.create({
        assetDescription,
        assetName,
        categories: specificCategories,
        email,
        referralCode,
        assetPictures: storageItems,
        estimatedPrice,
        firstName,
      });

    await this.evaluationRequestInterestEntityRepo.save(
      inviter
        ? [evaluationRequestInterest, inviter]
        : [evaluationRequestInterest],
    );

    if (inviter) {
      await this.mailingService.sendEvaluationRequestReferralUsageNotice(
        inviter.email,
        inviter.referralUsagesCounter,
      );
    }

    return new CreateEvaluationRequestInterestResponse({
      referralLink: `${this.configService.get(
        ConfigEnvEnum.APP_FRONTEND_URL,
      )}/evaluation-request-interests?referralCode=${referralCode}`,
    });
  }

  async getLeaderBoard(): Promise<LeaderBoardResponse> {
    return new LeaderBoardResponse({
      leaders: await this.evaluationRequestInterestEntityRepo.getLeaderBoard(),
    });
  }

  async pipeEvaluationRequestInterestImage(
    evaluationRequestInterestId: IdType,
    storageItemId: IdType,
    response: ResponseType,
  ): Promise<void> {
    const evaluationRequest =
      await this.evaluationRequestInterestEntityRepo.findOneOrFail({
        where: {
          id: evaluationRequestInterestId,
        },
        relations: ['assetPictures'],
      });

    const storageItem = evaluationRequest.assetPictures.find(
      (item) => item.id === storageItemId,
    );
    if (!storageItem) {
      throw new NotFoundException('Image not found.');
    }

    const stream = this.storageService.createReadStream(storageItem);

    if (!stream) {
      response.status(200).json({});
    } else {
      stream.pipe(response);
    }
  }

  async getEvaluationRequestInterestsInCsv(): Promise<string> {
    const evaluationRequestInterests =
      await this.evaluationRequestInterestEntityRepo.getEvaluationRequestInterests();
    const data = evaluationRequestInterests.map((item) => {
      let categories = '';
      let images = '';
      if (item.categories.length) {
        categories += item.categories.map((category) => {
          return category.userDefinedCategory;
        });
      }
      if (item.assetPictures.length) {
        images += item.assetPictures.map((assetPicture) => {
          return (
            `${this.configService.get(
              ConfigEnvEnum.APP_BACKEND_URL,
            )}/evaluation-request-interests/${item.id}/images/` +
            assetPicture.id
          );
        });
      }
      return {
        assetName: item.assetName,
        assetDescription: item.assetDescription,
        categories,
        estimatedPrice: item.estimatedPrice,
        firstName: item.firstName,
        email: item.email,
        createdAt: moment(item.createdAt).toISOString(),
        images,
      };
    });
    return converter.json2csvAsync(data);
  }
}
