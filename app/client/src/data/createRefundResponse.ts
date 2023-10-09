import { paymentResponse, refundResponse, refund } from 'generated-api-models';
import { paymentRefundResponse } from 'mocks/paymentRefundResponse.mock';

export const createRefundResponse = (
  refund: refund,
  transaction: paymentResponse,
): refundResponse => {
  const defaultResponse: refundResponse = paymentRefundResponse;
  return defaultResponse;
};
