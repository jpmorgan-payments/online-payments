import type { InferType } from 'yup';
import type { validationSchema } from './validationSchema';
import { createPaymentResponse } from 'data/createPaymentResponse';
import { MERCHANT, MERCHANT_ID } from 'data/constants';

// This data would be returned from your payment post request. We are mocking it out for showcase purposes.
export function convertToPaymentResponse(
  values: InferType<typeof validationSchema>,
) {
 return  createPaymentResponse({
    merchantId: MERCHANT_ID,
    merchant: MERCHANT,
    requestId: crypto.randomUUID(),
    amount: values.amount,
    paymentMethodType: JSON.parse(values.paymentMethod),
    currency: values.currency,
    captureMethod: values.captureMethod,
    isAmountFinal: values.isAmountFinal,
    initiatorType: values.initiatorType

  });
}
