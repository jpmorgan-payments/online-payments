import { HttpResponse, delay, http } from 'msw';
import { API_URL } from 'data/constants';
import {
  payment,
  paymentResponse,
  captureRequest,
  paymentPatch,
  refund,
} from '../generated-api-models/index';
import { createPaymentResponse } from 'data/createPaymentResponse';
import { paymentAuthorizeResponseListMock } from 'mocks/paymentAuthorizeResponseList.mock';
import { createCaptureResponse } from 'data/createCaptureResponse';
import { createRefundResponse } from 'data/createRefundResponse';

const previousPaymentsMock: paymentResponse[] =
  paymentAuthorizeResponseListMock;
const previousPayments = new Map();
previousPaymentsMock.map((payment) =>
  previousPayments.set(payment.transactionId, JSON.stringify(payment)),
);
export const handlers = [
  // Match create payment requests and update response to match
  http.post(`${API_URL}/api/payments`, async ({ request }) => {
    const {
      amount,
      paymentMethodType,
      merchant,
      currency,
      captureMethod,
      isAmountFinal,
      initiatorType,
    } = (await request.json()) as payment;
    const requestId = request.headers.get('request-id') as string;
    const merchantId = request.headers.get('merchant-id') as string;

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
    return HttpResponse.json(response);
  }),
  http.get(`${API_URL}/api/payments/:transactionId`, async ({ params }) => {
    const { transactionId } = params;
    const response = previousPayments.get(transactionId);
    if (response) {
      return HttpResponse.json(JSON.parse(response));
    }
    return new HttpResponse('Not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }),
  http.post(
    `${API_URL}/api/payments/:transactionId/captures`,
    async ({ params, request }) => {
      const { transactionId } = params;
      const requestBody = (await request.json()) as captureRequest;
      const response = previousPayments.get(transactionId);
      if (response) {
        const responseObject = createCaptureResponse(
          JSON.parse(response),
          requestBody,
        );
        previousPayments.set(transactionId, JSON.stringify(responseObject));
        await delay();

        return HttpResponse.json(responseObject);
      }
      return new HttpResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    },
  ),
  http.patch(
    `${API_URL}/api/payments/:transactionId`,
    async ({ params, request }) => {
      const { transactionId } = params;
      const requestBody = (await request.json()) as paymentPatch;
      const response = previousPayments.get(transactionId);
      if (response && requestBody.isVoid) {
        const responseObject = JSON.parse(response);
        responseObject.isVoid = true;
        previousPayments.set(transactionId, JSON.stringify(responseObject));
        return HttpResponse.json(responseObject);
      }
      return new HttpResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    },
  ),
  http.post(`${API_URL}/api/refunds`, async ({ request }) => {
    const requestBody: refund = (await request.json()) as refund;
    const previousPayment = previousPayments.get(
      requestBody.paymentMethodType?.transactionReference
        ?.transactionReferenceId,
    );
    const response = createRefundResponse(
      requestBody,
      JSON.parse(previousPayment),
    );
    previousPayments.set(response.transactionId, JSON.stringify(response));

    return HttpResponse.json(response);
  }),
];
