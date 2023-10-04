import { rest } from 'msw';
import { API_URL } from 'data/constants';
import type { payment } from '../generated-api-models/index';
import { createPaymentResponse } from 'data/createPaymentResponse';

const previousPayments = new Map();
export const handlers = [
  // Match create payment requests and update response to match
  rest.post(`${API_URL}/api/payments`, async (req, res, ctx) => {
    const {
      amount,
      paymentMethodType,
      merchant,
      currency,
      captureMethod,
      isAmountFinal,
      initiatorType,
    } = (await req.json()) as payment;
    const requestId = req.headers.get('request-id') as string;
    const merchantId = req.headers.get('merchant-id') as string;

    const response = createPaymentResponse({
      merchantId,
      merchant,
      requestId,
      amount,
      paymentMethodType,
      currency,
      captureMethod,
      isAmountFinal,
      initiatorType,
    });
    previousPayments.set(response.transactionId, JSON.stringify(response));
    return res(ctx.json(response));
  }),
  rest.get(`${API_URL}/api/payments/*`, async (req, res, ctx) => {
    const { 0: transactionId } = req.params;
    const response = previousPayments.get(transactionId);
    if (response) {
      return res(ctx.json(JSON.parse(response)));
    }
    return res(
      ctx.status(404),
      ctx.json({
        responseStatus: 'ERROR',
        responseCode: 'NOT_FOUND',
        responseMessage: 'Transaction was not found',
      }),
    );
  }),
];
