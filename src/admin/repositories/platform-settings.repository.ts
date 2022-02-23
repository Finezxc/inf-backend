import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { PlatformSettingsEntity } from '../../db/entities/platform-settings.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@Injectable()
@EntityRepository(PlatformSettingsEntity)
export class PlatformSettingsRepository extends BaseRepository<PlatformSettingsEntity> {}
