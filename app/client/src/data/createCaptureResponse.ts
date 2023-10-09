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

//We meed
const handleMultiCapture = (
  capture: captureRequest,
  transaction: paymentResponse,
) => {
  //update captures array

  // If we have captures length greater than zero then we update rather than create new
  if (
    transaction.paymentRequest?.captures &&
    transaction.paymentRequest.captures?.length > 0
  ) {
    const tempObject = transaction.paymentRequest;
    tempObject.captures?.push(createNewCapturesObject(capture.amount || 0));
    if (capture.multiCapture?.isFinalCapture) {
      tempObject.paymentRequestStatus =
        paymentRequest.paymentRequestStatus.CLOSED;
    }
    return tempObject;
  } else {
    return createPaymentRequestObject(
      capture.amount ? capture.amount : transaction.amount || 0,
      'AUTHORIZED',
      paymentRequest.paymentRequestStatus.OPEN,
      true,
      transaction.amount || 0,
    );
  }
};

const calculateRemainingAuthAmount = () => {
  //update remainingAuth
};
export const createCaptureResponse = (
  transaction: paymentResponse,
  capture: captureRequest,
): paymentResponse => {
  const response = JSON.parse(JSON.stringify(transaction)) as paymentResponse;
  response.captureMethod = captureMethod.NOW;
  response.transactionState = transactionState.CLOSED;
  response.captureTime = new Date().toISOString();
  if (capture.multiCapture) {
    response.multiCapture = capture.multiCapture;
    response.paymentRequest = handleMultiCapture(capture, transaction);
  } else {
    response.paymentRequest = createPaymentRequestObject(
      capture.amount ? capture.amount : transaction.amount || 0,
      'CAPTURED',
      paymentRequest.paymentRequestStatus.CLOSED,
      true,
      transaction.amount || 0,
    );
  }
  response.amount = capture.amount ? capture.amount : transaction.amount || 0;

  return response;
};
