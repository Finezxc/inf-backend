import { Entity } from 'typeorm';

import { BaseEnumEntity } from 'db/entities/base-enum.entity';
import { UserApprovalStatusEnum } from 'common/enums/user-approval-status.enum';

@Entity({ name: 'user_approval_statuses' })
export class UserApprovalStatusEntity extends BaseEnumEntity<UserApprovalStatusEnum> {}
