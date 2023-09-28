import { captureMethod, currency, isAmountFinal } from 'generated-api-models';
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
          accountNumber: '',
          expiry: {
            month: 0,
            year: 0,
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
  isAmountFinal: yup.boolean().default(false),
});

export { validationSchema };
