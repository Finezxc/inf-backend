import type { DisputeStatusEntity } from 'db/entities/dispute-status.entity';

export const disputeStatuses: Array<
  Partial<DisputeStatusEntity> & { name: string }
> = [
  {
    id: 1,
    name: 'Not reviewed',
  },
  {
    id: 2,
    name: 'Accepted',
  },
  {
    id: 3,
    name: 'Rejected',
  },
];
