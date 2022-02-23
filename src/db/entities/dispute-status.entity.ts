import { Entity } from 'typeorm';

import { DisputeStatusEnum } from 'common/enums/dispute-status.enum';
import { BaseEnumEntity } from 'db/entities/base-enum.entity';

@Entity({ name: 'dispute_statuses' })
export class DisputeStatusEntity extends BaseEnumEntity<DisputeStatusEnum> {}
