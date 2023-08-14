import type { paymentMethodType } from 'generated-api-models';

export const paymentMethodMock: paymentMethodType[] = [
  {
    card: {
      accountNumber: '4012000033330026',
      expiry: {
        month: 5,
        year: 2027,
      },
      isBillPayment: true,
    },
  },
] as paymentMethodType[];
