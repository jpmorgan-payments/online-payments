import * as yup from 'yup';
import { paymentInstrument } from './models';

const validationSchema = yup.object({
  amount: yup.string().default('').required(),
  merchantId: yup.string().default('').required(),
  paymentMethod: yup.string().default(JSON.stringify({
    card: {
      accountNumber: '',
      expiry: {
        month: 0,
        year: 0,
      },
      isBillPayment: true,
    },
  })).required(),
  paymentInstrument:yup.string().default(paymentInstrument['Approved Auth Basic']).required(),
  referenceId:yup.string().default(JSON.stringify({
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
  })).required()
});

export { validationSchema };
