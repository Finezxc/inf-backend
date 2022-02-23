import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'db/entities/base-entity.entity';
import { RequestStatusEntity } from 'db/entities/request-status.entity';
import { NosisIdType, NosisIdTypeLiteral } from 'common/types/nosis-id.type';
import { CurrencyEntity } from 'db/entities/currency.entity';
import { ResponseEntity } from 'db/entities/response.entity';
import { UserEntity } from 'db/entities/user.entity';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { CategoryEntity } from './category.entity';
import { AvailabilityStatus } from '../../common/constansts/availability-status';

@Entity({ name: 'requests' })
export class RequestEntity extends BaseEntity {
  @Column(NosisIdTypeLiteral)
  requesterId: NosisIdType;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('float')
  reward: number;

  @Column('int', { array: true, default: [] })
  inflationAdjustmentYears: number[];

  @ManyToOne(() => RequestStatusEntity)
  status: RequestStatusEntity;

  @ManyToMany(() => CategoryEntity, { cascade: true })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToMany(() => CurrencyEntity)
  @JoinTable()
  currencies: CurrencyEntity[];

  @OneToMany(() => ResponseEntity, (response) => response.request, {
    cascade: true,
  })
  responses: ResponseEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column('int')
  timeLimit?: number;

  @ManyToOne(() => UserEntity)
  verifier?: UserEntity;

  @ManyToMany(() => ExpertiseKeywordEntity)
  @JoinTable()
  expertiseKeywords: ExpertiseKeywordEntity[];

  @Column({ nullable: true })
  requestViews: number;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  visitors: UserEntity[];

  numberOfResponses?: number;

  availabilityStatus?: AvailabilityStatus;

  verifiedResponse: ResponseEntity;

  pending?: boolean;

  ownResponse?: ResponseEntity;
}
