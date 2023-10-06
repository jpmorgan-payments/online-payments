import {
  paymentAuth,
  paymentCapture,
  paymentRequest,
} from 'generated-api-models';

export const createPaymentRequestObject = (
  amount: number,
  transactionStatusCode: string,
  paymentRequestStatus: paymentRequest.paymentRequestStatus,
  isCaptures: boolean,
) => {
  return {
    paymentRequestId: crypto.randomUUID(),
    paymentRequestStatus: paymentRequestStatus,
    authorizations: [
      {
        authorizationId: crypto.randomUUID(),
        amount: amount,
        transactionStatusCode: transactionStatusCode,
        authorizationType: paymentAuth.authorizationType.INITIAL,
      },
    ],
    captures: isCaptures ? createCapturesArray(amount) : undefined,
  };
};

const createCapturesArray = (amount: number): paymentCapture[] => {
  return [
    {
      captureId: crypto.randomUUID(),
      amount: amount,
      transactionStatusCode: 'CLOSED',
      captureRemainingRefundableAmount: amount,
    },
  ];
};