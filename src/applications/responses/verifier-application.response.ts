import { ApiProperty } from '@nestjs/swagger';

import { UserApprovalStatusEntity } from 'db/entities/user-approval-status.entity';

export class VerifierApplicationResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  approvalStatus: UserApprovalStatusEntity;
}
