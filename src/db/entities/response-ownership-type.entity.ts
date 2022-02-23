import { Entity } from 'typeorm';

import { ResponseOwnershipTypeEnum } from 'common/enums/response-ownership-type.enum';
import { BaseEnumEntity } from 'db/entities/base-enum.entity';

@Entity({ name: 'response_ownership_types' })
export class ResponseOwnershipTypeEntity extends BaseEnumEntity<ResponseOwnershipTypeEnum> {}
