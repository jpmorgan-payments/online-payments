import { captureMethod, currency, initiatorType } from 'generated-api-models';
import * as yup from 'yup';

const validationSchema = yup.object({
  amount: yup.number().default(10).required(),
  captureMethod: yup
    .mixed()
    .oneOf(Object.values(captureMethod))
    .default(captureMethod.NOW)
    .required(),
  paymentMethod: yup
    .string()
    .default(
      JSON.stringify({
        card: {
          accountNumber: '4012000033330026',
          expiry: {
            month: 5,
            year: 2027,
          },
          isBillPayment: true,
        },
      }),
    )
    .required(),
  currency: yup
    .mixed()
    .oneOf(Object.values(currency))
    .default(currency.USD)
    .required(),
  isAmountFinal: yup.boolean().default(true),
  initiatorType: yup
    .mixed()
    .oneOf(Object.values(initiatorType))
    .default(initiatorType.CARDHOLDER)
    .required(),
});

export { validationSchema };
