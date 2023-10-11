import { refundResponse, refund, paymentResponse } from 'generated-api-models';
import { paymentRefundResponse } from 'mocks/paymentRefundResponse.mock';

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
): refundResponse => {
  const defaultResponse: refundResponse = paymentRefundResponse;
  defaultResponse.transactionId =
    refund.paymentMethodType?.transactionReference?.transactionReferenceId;
  defaultResponse.amount = refund.amount || transaction.amount || 0;
  defaultResponse.remainingRefundableAmount =
    calculateRemainingRefundableAmount(transaction.amount, refund.amount);
  return defaultResponse;
};
