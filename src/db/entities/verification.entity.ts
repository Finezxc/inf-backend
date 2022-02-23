import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'db/entities/base-entity.entity';
import { ResponseEntity } from 'db/entities/response.entity';
import { UserEntity } from 'db/entities/user.entity';

@Entity({ name: 'verifications' })
export class VerificationEntity extends BaseEntity {
  @OneToOne(() => ResponseEntity)
  response: ResponseEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  verificationResult: boolean;

  @Column('float', { nullable: true })
  assignedReward?: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
