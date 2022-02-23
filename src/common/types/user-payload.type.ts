import { UserRoleEntity } from '../../db/entities/user-role.entity';

export declare type UserPayload = {
  id: number;
  email: string;
  roles: UserRoleEntity[];
};
