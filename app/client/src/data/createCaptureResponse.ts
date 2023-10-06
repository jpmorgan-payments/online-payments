import {
  paymentResponse,
  transactionState,
  paymentRequest,
} from 'generated-api-models';
import { createPaymentRequestObject } from './createPaymentRequest';

export const createCaptureResponse = (
  transaction: paymentResponse,
): paymentResponse => {
  const response = transaction;

  response.transactionState = transactionState.CLOSED;
  response.captureTime = new Date().toISOString();
  response.paymentRequest = createPaymentRequestObject(
    transaction.amount ? transaction.amount : 0,
    'CAPTURED',
    paymentRequest.paymentRequestStatus.CLOSED,
    true,
  );
  return response;
};
