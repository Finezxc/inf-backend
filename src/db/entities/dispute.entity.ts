import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'db/entities/base-entity.entity';
import { NosisIdType, NosisIdTypeLiteral } from 'common/types/nosis-id.type';
import { DisputeStatusEntity } from 'db/entities/dispute-status.entity';
import { ResponseEntity } from 'db/entities/response.entity';
import { UserEntity } from 'db/entities/user.entity';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'disputes' })
export class DisputeEntity extends BaseEntity {
  @Column('text')
  reason: string;

  @Column('text')
  description: string;

  @Column(NosisIdTypeLiteral)
  requesterId: NosisIdType;

  @ManyToOne(() => DisputeStatusEntity)
  status: DisputeStatusEntity;

  @ManyToOne(() => ResponseEntity)
  response: ResponseEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  admin?: UserEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  resolvedAt?: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.dispute)
  comments: CommentEntity[];
}
