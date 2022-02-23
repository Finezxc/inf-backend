import type { UserRoleEntity } from 'db/entities/user-role.entity';

export const userRoles: Array<Partial<UserRoleEntity> & { name: string }> = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'Superadmin',
  },
  {
    id: 3,
    name: 'Responder',
  },
  {
    id: 4,
    name: 'Verifier',
  },
];
