import { Entity } from 'typeorm';

import { RequestStatusEnum } from 'common/enums/request-status.enum';
import { BaseEnumEntity } from 'db/entities/base-enum.entity';

@Entity({ name: 'request_statuses' })
export class RequestStatusEntity extends BaseEnumEntity<RequestStatusEnum> {}
