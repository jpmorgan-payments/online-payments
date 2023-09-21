import { rest } from 'msw';

import { API_URL } from 'data/constants';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';
import type {
  merchant,
  payment,
  paymentResponse,
} from '../generated-api-models/index';
export const handlers = [
  // Match create payment requests and update response to match
  rest.post(`${API_URL}/api/payments`, async (req, res, ctx) => {
    const { amount, paymentMethodType, merchant } =
      (await req.json()) as payment;
    const requestId = req.headers.get('request-id') as string;
    const merchantId = req.headers.get('merchant-id') as string;

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
    return res(ctx.json(response));
  }),
  rest.get(`${API_URL}/api/payments/*`, async (req, res, ctx) => {
    return res(ctx.json(paymentAuthorizeResponseMock));
  }),
];
