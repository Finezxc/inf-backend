import type { ResponderPaymentStrategy } from 'db/entities/payment-strategy.entity';

export const responderPaymentStrategies: Array<
  Partial<ResponderPaymentStrategy> & { name: string }
> = [
  {
    id: 1,
    name: 'Simple ratio',
  },
  {
    id: 2,
    name: 'Rating-dependent',
  },
];
