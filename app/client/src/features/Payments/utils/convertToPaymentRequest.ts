import type { InferType } from 'yup';
import type {
  merchant,
  payment,
} from 'generated-api-models';
import type { validationSchema } from './validationSchema';
import { paymentInstrument } from './models';

const defaultMerchant = {
  merchantId: '',
  merchantSoftware: {
    companyName: ' ',
    productName: ' ',
    version: ' ',
  },
};

export function convertToPaymentRequest(
  values: InferType<typeof validationSchema>,
  paymentInstrumentValue: paymentInstrument,
  merchant?: merchant,
) {
  const { merchantId, ...merchantRequest } = merchant || defaultMerchant;
  const defaultResponse: payment = {
    captureMethod: 'NOW',
    amount: Number(values.amount),
    currency: 'USD',
    merchant: merchantRequest,
    paymentMethodType: JSON.parse(values.paymentMethod),
    initiatorType: 'CARDHOLDER',
    accountOnFile: 'NOT_STORED',
    isAmountFinal: true,
  } as payment;
  if (
    paymentInstrumentValue ===
    paymentInstrument['Approved Auth CIT Onetime Stored']
  ) {
    defaultResponse.accountHolder = JSON.parse(values.referenceId);
  }
  return defaultResponse;
}
