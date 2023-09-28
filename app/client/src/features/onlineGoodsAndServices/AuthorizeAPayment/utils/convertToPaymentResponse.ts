import type { InferType } from 'yup';
import type { paymentResponse } from 'generated-api-models';
import type { validationSchema } from './validationSchema';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';

// This data would be returned from your payment post request. We are mocking it out for showcase purposes.
export function convertToPaymentResponse(
  values: InferType<typeof validationSchema>,
) {
  //Deep copy object (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)
  const defaultResponse: paymentResponse = JSON.parse(
    JSON.stringify(paymentAuthorizeResponseMock),
  );
  defaultResponse.amount = values.amount;
  defaultResponse.paymentMethodType = JSON.parse(values.paymentMethod);
  defaultResponse.requestId = crypto.randomUUID();
  defaultResponse.transactionId = crypto.randomUUID();
  defaultResponse.transactionDate = new Date().toISOString();
  defaultResponse.currency = values.currency;
  defaultResponse.captureMethod = values.captureMethod;
  defaultResponse.isAmountFinal = values.isAmountFinal;
  return defaultResponse;
}
