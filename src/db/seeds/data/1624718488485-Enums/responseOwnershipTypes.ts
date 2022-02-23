import type { ResponseOwnershipTypeEntity } from 'db/entities/response-ownership-type.entity';

export const responseOwnershipTypes: Array<
  Partial<ResponseOwnershipTypeEntity> & { name: string }
> = [
  {
    id: 1,
    name: 'User-generated',
  },
  {
    id: 2,
    name: 'User-owned',
  },
  {
    id: 3,
    name: 'Open-source',
  },
];
