import type { InferType } from 'yup';
import type { merchant, paymentResponse } from 'generated-api-models';
import type { validationSchema } from './validationSchema';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';

// This data would be returned from your payment post request. We are mocking it out for showcase purposes.
export function convertToPaymentResponse(
  values: InferType<typeof validationSchema>,
  merchant?: merchant,
) {
  //Deep copy object (https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)
  const defaultResponse: paymentResponse = JSON.parse(
    JSON.stringify(paymentAuthorizeResponseMock),
  );
  if (merchant) defaultResponse.merchant = merchant;
  defaultResponse.amount = Number(values.amount);
  defaultResponse.paymentMethodType = JSON.parse(values.paymentMethod);
  defaultResponse.requestId = crypto.randomUUID();
  defaultResponse.transactionId = crypto.randomUUID();
  defaultResponse.transactionDate = new Date().toISOString();
  return defaultResponse;
}
