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
  referenceId: yup
    .string()
    .default(
      JSON.stringify({
        referenceId: '',
        fullName: '',
        email: '',
        IPAddress: '',
        billingAddress: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          postalCode: '',
        },
      }),
    )
    .required(),
  shipTo: yup
    .string()
    .default(
      JSON.stringify({
        shippingAddress: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          postalCode: '',
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
