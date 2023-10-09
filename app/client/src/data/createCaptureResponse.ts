import {
  paymentResponse,
  transactionState,
  paymentRequest,
  captureMethod,
  captureRequest,
} from 'generated-api-models';
import { createPaymentRequestObject } from './createPaymentRequest';

export const createCaptureResponse = (
  transaction: paymentResponse,
  capture: captureRequest,
): paymentResponse => {
  const response = JSON.parse(JSON.stringify(transaction)) as paymentResponse;
  response.captureMethod = captureMethod.NOW;
  response.transactionState = transactionState.CLOSED;
  response.captureTime = new Date().toISOString();
  response.amount = capture.amount ? capture.amount : transaction.amount || 0;
  response.paymentRequest = createPaymentRequestObject(
    capture.amount ? capture.amount : transaction.amount || 0,
    'CAPTURED',
    paymentRequest.paymentRequestStatus.CLOSED,
    true,
    transaction.amount || 0,
  );
  return response;
};

/**
 *  Captures amount - amount, capturesamount, captures remaining refundable amount
 * Original amount - totalAuthorized, authorizations.amount
 */
