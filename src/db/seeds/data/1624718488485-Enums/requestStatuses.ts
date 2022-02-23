import type { RequestStatusEntity } from 'db/entities/request-status.entity';

export const requestStatuses: Array<
  Partial<RequestStatusEntity> & { name: string }
> = [
  {
    id: 1,
    name: 'Submitted',
  },
  {
    id: 2,
    name: 'Rejected',
  },
  {
    id: 3,
    name: 'Approved',
  },
  {
    id: 4,
    name: 'Verified',
  },
  {
    id: 5,
    name: 'Completed',
  },
];
