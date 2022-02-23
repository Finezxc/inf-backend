import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'db/entities/base-entity.entity';
import { ResponderPaymentStrategy } from 'db/entities/payment-strategy.entity';

@Entity('admin-payment-settings')
export class AdminPaymentSettingsEntity extends BaseEntity {
  /**
   *
   */
  @Column('float')
  defaultReward: number;
  /**
   *
   */
  @Column('float')
  defaultTimeLimit: number;
  /**
   * Takes 0.0-1.0
   */
  @Column('float')
  platformFeeFactor: number;

  /**
   * Takes 0.0-1.0
   */
  @Column('float')
  verifierRewardFactor: number;

  /**
   * Takes 0.0-1.0
   */
  @Column('float')
  responderRewardFactor: number;

  @ManyToOne(() => ResponderPaymentStrategy, { eager: true })
  responderPaymentStrategy: ResponderPaymentStrategy;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  /**
   * Ideally we will have only ONE entry in this table
   */
  @Column()
  isCurrent: boolean;
}
