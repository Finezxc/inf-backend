import { BaseEntity } from './base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DisputeEntity } from './dispute.entity';
import {
  NosisIdType,
  NosisIdTypeLiteral,
} from '../../common/types/nosis-id.type';
import { UserEntity } from './user.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column(NosisIdTypeLiteral)
  requesterId?: NosisIdType;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user?: UserEntity;

  @ManyToOne(() => DisputeEntity, (dispute) => dispute.comments)
  dispute: DisputeEntity;

  @Column('text')
  body: string;
}
