import type { InferType } from 'yup';
import type { payment } from 'generated-api-models';
import { type validationSchema } from './validationSchema';
import { MERCHANT } from 'data/constants';

export function convertToPaymentRequest(
  values: InferType<typeof validationSchema>,
) {
  const defaultResponse: payment = {
    captureMethod: values.captureMethod,
    amount: values.amount,
    currency: values.currency,
    paymentMethodType: JSON.parse(values.paymentMethod),
    initiatorType: values.initiatorType,
    accountOnFile: 'NOT_STORED',
    isAmountFinal: values.isAmountFinal,
    merchant: MERCHANT,
  } as payment;
  return defaultResponse;
}
