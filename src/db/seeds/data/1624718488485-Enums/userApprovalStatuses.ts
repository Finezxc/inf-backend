import type { UserApprovalStatusEntity } from 'db/entities/user-approval-status.entity';

export const userApprovalStatuses: Array<
  Partial<UserApprovalStatusEntity> & { name: string }
> = [
  {
    id: 1,
    name: 'Verifier-pending',
  },
  {
    id: 2,
    name: 'Approved',
  },
  {
    id: 3,
    name: 'Banned',
  },
];
