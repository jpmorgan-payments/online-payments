import { currency } from 'generated-api-models';
import * as yup from 'yup';

const validationSchema = yup.object({
  amount: yup.string().default('').required(),
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
  currency: yup.mixed().oneOf(Object.values(currency)).default(currency.USD),
});

export { validationSchema };
