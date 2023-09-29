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
  {
    card: {
      accountNumber: '4012000033330123',
      expiry: {
        month: 6,
        year: 2029,
      },
      isBillPayment: true,
    },
  },
  {
    card: {
      accountNumber: '4012000033330673',
      expiry: {
        month: 9,
        year: 2029,
      },
      isBillPayment: true,
    },
  },
] as paymentMethodType[];
