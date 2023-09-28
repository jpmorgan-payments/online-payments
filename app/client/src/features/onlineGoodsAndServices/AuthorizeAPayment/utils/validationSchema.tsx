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
});

export { validationSchema };
