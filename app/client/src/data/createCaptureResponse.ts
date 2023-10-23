import {
  paymentResponse,
  transactionState,
  paymentRequest,
  captureMethod,
  captureRequest,
} from 'generated-api-models';
import {
  createNewCapturesObject,
  createPaymentRequestObject,
} from './createPaymentRequest';

const handleMultiCapture = (
  capture: captureRequest,
  transaction: paymentResponse,
) => {
  // If we have captures length greater than zero then we update rather than create new
  if (
    transaction.paymentRequest?.captures &&
    transaction.paymentRequest.captures?.length > 0
  ) {
    const tempObject = transaction.paymentRequest;
    tempObject.captures?.push(createNewCapturesObject(capture.amount || 0));
    //Check if we are on final capture
    if (capture.multiCapture?.isFinalCapture) {
      tempObject.paymentRequestStatus =
        paymentRequest.paymentRequestStatus.CLOSED;
      if (tempObject.authorizations && tempObject.authorizations.length > 0) {
        tempObject.authorizations[0].transactionStatusCode = 'CAPTURED';
      }
    }
    return tempObject;
  } else {
    return createPaymentRequestObject(
      capture.amount ? capture.amount : transaction.amount || 0,
      'AUTHORIZED',
      paymentRequest.paymentRequestStatus.OPEN,
      true,
      transaction.amount || 0,
      false,
      [],
      transaction.paymentRequest?.captures,
    );
  }
};

export const createCaptureResponse = (
  transaction: paymentResponse,
  capture: captureRequest,
): paymentResponse => {
  const response = JSON.parse(JSON.stringify(transaction)) as paymentResponse;
  const paymentAmount = capture.amount || transaction.amount || 0;

  const calculatedRemainingAuthAmount = response.remainingAuthAmount
    ? response.remainingAuthAmount - paymentAmount
    : 0;
  response.captureMethod = captureMethod.NOW;
  response.transactionState = transactionState.CLOSED;
  response.captureTime = new Date().toISOString();
  response.remainingAuthAmount =
    calculatedRemainingAuthAmount > 0 ? calculatedRemainingAuthAmount : 0;
  if (capture.multiCapture) {
    response.multiCapture = capture.multiCapture;
    response.paymentRequest = handleMultiCapture(capture, transaction);
  } else {
    response.paymentRequest = createPaymentRequestObject(
      paymentAmount,
      'CAPTURED',
      paymentRequest.paymentRequestStatus.CLOSED,
      true,
      transaction.amount || 0,
      false,
      [],
      transaction.paymentRequest?.captures,
    );
  }
  response.amount = paymentAmount;

  return response;
};
