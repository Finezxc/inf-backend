import { HttpStatus, Injectable } from '@nestjs/common';
import { PlatformSettingsRepository } from './repositories/platform-settings.repository';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Settings } from '../common/settings';
import { UpdateSettingResponse } from './responses/update-setting.response';
import { PlatformSettingsEntity } from '../db/entities/platform-settings.entity';
import { UserRepository } from '../account/repositories/user.repository';
import { LessThanOrEqual } from 'typeorm';
import { IdType } from '../common/types/id-type.type';
import { StatusResponse } from '../account/responses/status.response';
import { bufferToStream } from '../common/utils/bufferToStream';
import { BucketStoragePathsEnum } from '../storage/enums/bucket-storage-paths.enum';
import { StorageService } from '../storage/services/storage.service';
import { ResponseTemplateRepository } from '../responses/repositories/response-template.repository';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class AdminService {
  constructor(
    private readonly platformSettingsRepository: PlatformSettingsRepository,
    private readonly userRepository: UserRepository,
    private readonly storageService: StorageService,
    private readonly responseTemplateRepository: ResponseTemplateRepository,
  ) {}

  async getAllSettings(): Promise<PlatformSettingsEntity[]> {
    return this.platformSettingsRepository.find();
  }

  async getUsersWithLowRating() {
    const setting = await this.platformSettingsRepository.findOneOrFail(
      Settings.rating_restrictions,
    );
    return this.userRepository.find({ rating: LessThanOrEqual(setting.value) });
  }

  async updateSetting(
    id: number,
    value: number,
  ): Promise<UpdateSettingResponse> {
    const setting = await this.platformSettingsRepository.findOneOrFail(id);
    if (
      setting.customization ===
        Settings[Settings.reward_percentage_for_responder] ||
      setting.customization ===
        Settings[Settings.reward_percentage_for_verifier]
    ) {
      const reward =
        setting.customization ===
        Settings[Settings.reward_percentage_for_responder]
          ? Settings[Settings.reward_percentage_for_verifier]
          : Settings[Settings.reward_percentage_for_responder];
      const result = await this.platformSettingsRepository.update(id, {
        value,
      });
      const remainder = await this.platformSettingsRepository.update(
        Settings[reward],
        {
          value: 100 - value,
        },
      );
      if (result.affected !== 1 || remainder.affected !== 1) {
        throw new HttpException('Setting not found', HttpStatus.NOT_FOUND);
      }
    } else {
      const result = await this.platformSettingsRepository.update(id, {
        value,
      });
      if (result.affected !== 1) {
        throw new HttpException('Setting not found', HttpStatus.NOT_FOUND);
      }
    }
    return { customization: Settings[id], value: value };
  }

  async updateUserRating(id: IdType): Promise<StatusResponse> {
    const result = await this.userRepository.update({ id }, { rating: 5 });
    if (result.affected === 0) {
      throw new HttpException('Rating update failed', HttpStatus.BAD_REQUEST);
    }
    return { status: true };
  }

  async uploadTemplate(file: MemoryStoredFile): Promise<StatusResponse> {
    const stream = bufferToStream(file.buffer);

    const template = await this.storageService.upload({
      fileName: file.originalName,
      storagePath: BucketStoragePathsEnum.responseTemplate,
      fileStream: stream,
    });
    await this.responseTemplateRepository.save({
      name: 'Response template',
      storageItem: { id: template.id },
    });
    return { status: true };
  }
}
