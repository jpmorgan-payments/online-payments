import {
  currency,
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
}
export const manipulateJsonResponse = ({
  merchantId,
  merchant,
  requestId,
  amount,
  paymentMethodType,
  currency,
}: manipulateJsonResponseProps) => {
  // Bit of a hack to get merchant ID updated as it's read-only
  const updatedMerchant = {
    merchantId: merchantId,
  } as merchant;
  Object.assign(updatedMerchant, merchant);

  const response = paymentAuthorizeResponseMock as paymentResponse;
  response.requestId = requestId;
  response.transactionId = crypto.randomUUID();
  response.merchant = updatedMerchant;
  response.amount = amount;
  response.paymentMethodType = paymentMethodType;
  response.transactionDate = new Date().toISOString();
  response.currency = currency;
  return response;
};
