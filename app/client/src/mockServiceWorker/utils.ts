import {
  captureMethod,
  currency,
  initiatorType,
  isAmountFinal,
  merchant,
  paymentMethodType,
  paymentResponse,
} from 'generated-api-models';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';

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
export const manipulateJsonResponse = ({
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
  if (captureMethod) response.captureMethod = captureMethod;

  return response;
};


const updateAmountDetails=(response: paymentResponse, amount: number) => {
  response.amount = amount;
  response.remainingAuthAmount = amount;
  response.remainingRefundableAmount = amount;

  const paymentAuthorizations = response.paymentRequest?.authorizations;
  if (paymentAuthorizations && paymentAuthorizations.length > 0) {
    paymentAuthorizations[0].amount = amount;
  }
  return response;
}