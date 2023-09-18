import type { InferType } from 'yup';
import type { merchant, paymentResponse } from 'generated-api-models';
import type { validationSchema } from './validationSchema';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';

// This data would be returned from your payment post request. We are mocking it out for showcase purposes.
export function convertToPaymentResponse(
  values: InferType<typeof validationSchema>,
  merchant?: merchant,
) {
  const defaultResponse: paymentResponse = paymentAuthorizeResponseMock;
  if (merchant) defaultResponse.merchant = merchant;
  defaultResponse.amount = Number(values.amount);
  defaultResponse.paymentMethodType = JSON.parse(values.paymentMethod);
  defaultResponse.requestId = crypto.randomUUID();
  defaultResponse.transactionId = crypto.randomUUID();
  return defaultResponse;
}
