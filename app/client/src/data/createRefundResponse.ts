import { refundResponse, refund, paymentResponse, paymentRequest } from 'generated-api-models';
import { paymentRefundResponse } from 'mocks/paymentRefundResponse.mock';
import { createPaymentRequestObject } from './createPaymentRequest';

const calculateRemainingRefundableAmount = (
  transactionAmount?: number,
  refundAmount?: number,
) => {
  if (refundAmount) {

    return transactionAmount ? transactionAmount - refundAmount : 0;
  }
  return transactionAmount;
};
export const createRefundResponse = (
  refund: refund,
  transaction: paymentResponse,
): paymentResponse => {
  const response = JSON.parse(JSON.stringify(transaction)) as paymentResponse;
  response.remainingRefundableAmount =
  calculateRemainingRefundableAmount(transaction.amount, refund.amount);
  response.amount = refund.amount || transaction.amount || 0;
  response.paymentRequest = createPaymentRequestObject(refund.amount || 0, "AUTHORIZED", paymentRequest.paymentRequestStatus.OPEN, false, transaction.amount, true, transaction.paymentRequest?.refunds);
  return response;
};
