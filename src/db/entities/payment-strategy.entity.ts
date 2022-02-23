import { Entity } from 'typeorm';

import { BaseEnumEntity } from 'db/entities/base-enum.entity';
import { ResponderPaymentStrategyTypeEnum } from 'common/enums/responder-paymnet-strategy-type.enum';

@Entity({ name: 'responder-payment-strategies' })
export class ResponderPaymentStrategy extends BaseEnumEntity<ResponderPaymentStrategyTypeEnum> {}
