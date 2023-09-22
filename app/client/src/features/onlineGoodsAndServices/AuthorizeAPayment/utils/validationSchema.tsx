import * as yup from 'yup';

const validationSchema = yup.object({
  amount: yup.string().default('').required(),
  merchantId: yup.string().default('').required(),
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

const defaultMerchant = {
  merchantId: '',
  merchantSoftware: {
    companyName: ' ',
    productName: ' ',
    version: ' ',
  },
};
export { validationSchema, defaultMerchant };
