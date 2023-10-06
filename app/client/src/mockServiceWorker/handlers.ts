import { rest } from 'msw';
import { API_URL } from 'data/constants';
import { transactionState, type payment, paymentResponse } from '../generated-api-models/index';
import { createPaymentResponse } from 'data/createPaymentResponse';
import { paymentAuthorizeResponseListMock } from 'mocks/paymentAuthorizeResponseList.mock';


const previousPaymentsMock: paymentResponse[] = paymentAuthorizeResponseListMock;
const previousPayments = new Map();
previousPaymentsMock.map(payment => previousPayments.set(payment.transactionId, JSON.stringify(payment)));
console.log('here')
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
  rest.get(`${API_URL}/api/payments/:transactionId`, async (req, res, ctx) => {
    const { transactionId } = req.params;
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
  rest.post(
    `${API_URL}/api/payments/:transactionId/captures`,
    async (req, res, ctx) => {
      const requestId = req.headers.get('request-id') as string;
      const merchantId = req.headers.get('merchant-id') as string;
      const { transactionId } = req.params;

      const response = previousPayments.get(transactionId);
      if (response) {
        const responseObject = JSON.parse(response);
        responseObject.requestId = requestId;
        responseObject.merchantId = merchantId;
        responseObject.transactionState = transactionState.CLOSED;
        previousPayments.set(transactionId, JSON.stringify(responseObject));
        return res(ctx.json(responseObject));
      }
      return res(
        ctx.status(404),
        ctx.json({
          responseStatus: 'ERROR',
          responseCode: 'NOT_FOUND',
          responseMessage: 'Transaction was not found',
        }),
      );
    },
  ),
];
