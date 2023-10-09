import {
  captureMethod,
  currency,
  initiatorType,
  isAmountFinal,
  merchant,
  paymentMethodType,
  paymentResponse,
  transactionState,
  paymentRequest,
} from 'generated-api-models';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';
import { createPaymentRequestObject } from './createPaymentRequest';

interface manipulateJsonResponseProps {
  merchantId: string;
  merchant: merchant;
  requestId: string;
  amount: number;
  paymentMethodType: paymentMethodType;
  currency: currency;
  captureMethod?: captureMethod;
  isAmountFinal?: isAmountFinal;
  initiatorType?: initiatorType;
}
export const createPaymentResponse = ({
  merchantId,
  merchant,
  requestId,
  amount,
  paymentMethodType,
  currency,
  captureMethod,
  isAmountFinal,
  initiatorType,
}: manipulateJsonResponseProps) => {
  // Bit of a hack to get merchant ID updated as it's read-only
  const updatedMerchant = {
    merchantId: merchantId,
  } as merchant;
  Object.assign(updatedMerchant, merchant);

  let response = paymentAuthorizeResponseMock as paymentResponse;
  response.requestId = requestId;
  response.transactionId = crypto.randomUUID();
  response.merchant = updatedMerchant;
  response = updateAmountDetails(response, amount);
  response.paymentMethodType = paymentMethodType;
  response.transactionDate = new Date().toISOString();
  response.currency = currency;
  if (initiatorType) response.initiatorType = initiatorType;
  if (isAmountFinal) response.isAmountFinal = isAmountFinal;
  if (captureMethod)
    response = updateBasedOnCaptureMethod(response, captureMethod, amount);
  return response;
};

const updateBasedOnCaptureMethod = (
  response: paymentResponse,
  capture: captureMethod,
  amount: number,
) => {
  response.captureTime = new Date().toISOString();
  response.hostReferenceId = crypto.randomUUID().replaceAll('-', '');

  switch (capture) {
    case captureMethod.DELAYED:
      response.transactionState = transactionState.AUTHORIZED;
      response.approvalCode = 'tst303';
      response.captureMethod = captureMethod.DELAYED;
      response.paymentRequest = createPaymentRequestObject(
        amount,
        'AUTHORIZED',
        paymentRequest.paymentRequestStatus.PENDING,
        false,
      );
      return response;

    case captureMethod.MANUAL:
      response.transactionState = transactionState.AUTHORIZED;
      response.approvalCode = 'tst820';
      response.captureMethod = captureMethod.MANUAL;
      response.paymentRequest = createPaymentRequestObject(
        amount,
        'AUTHORIZED',
        paymentRequest.paymentRequestStatus.PENDING,
        false,
      );
      return response;

    case captureMethod.NOW:
      response.transactionState = transactionState.CLOSED;
      response.approvalCode = 'tst484';
      response.captureMethod = captureMethod.NOW;
      response.paymentRequest = createPaymentRequestObject(
        amount,
        'CAPTURED',
        paymentRequest.paymentRequestStatus.CLOSED,
        true,
      );
      return response;
    default:
      return response;
  }
};

const updateAmountDetails = (response: paymentResponse, amount: number) => {
  response.amount = amount;
  response.remainingAuthAmount = amount;
  response.remainingRefundableAmount = amount;
  response.totalAuthorizedAmount = amount;
  return response;
};
