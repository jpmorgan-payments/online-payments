import type { InferType } from 'yup';
import type { merchant, payment } from 'generated-api-models';
import { defaultMerchant, type validationSchema } from './validationSchema';

export function convertToPaymentRequest(
  values: InferType<typeof validationSchema>,
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
  return defaultResponse;
}
