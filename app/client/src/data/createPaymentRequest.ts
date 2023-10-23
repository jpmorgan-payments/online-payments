import {
  paymentAuth,
  paymentCapture,
  paymentRefund,
  paymentRequest,
} from 'generated-api-models';

export const createPaymentRequestObject = (
  amount: number,
  transactionStatusCode: string,
  paymentRequestStatus: paymentRequest.paymentRequestStatus,
  isCaptures: boolean,
  authorizationsAmount: number = amount,
  isRefunds: boolean = false,
  refunds: paymentRefund[] = [],
  captures: paymentCapture[] = [],
) => {
  return {
    paymentRequestId: crypto.randomUUID(),
    paymentRequestStatus: paymentRequestStatus,
    authorizations: [
      {
        authorizationId: crypto.randomUUID(),
        amount: authorizationsAmount,
        transactionStatusCode: transactionStatusCode,
        authorizationType: paymentAuth.authorizationType.INITIAL,
      },
    ],
    captures: isCaptures ? createCapturesArray(amount, captures) : undefined,
    refunds: isRefunds ? createRefundArray(amount, refunds) : undefined,
  };
};

const createRefundArray = (
  amount: number,
  refunds: paymentRefund[],
): paymentRefund[] => {
  if (refunds && refunds.length > 0) {
    refunds.push(createNewRefundObject(amount));
    return refunds;
  }
  return [createNewRefundObject(amount)];
};

export const createNewRefundObject = (amount: number): paymentRefund => {
  return {
    refundId: crypto.randomUUID(),
    amount: amount,
    transactionStatusCode: 'CLOSED',
  };
};

const createCapturesArray = (
  amount: number,
  captures: paymentCapture[],
): paymentCapture[] => {
  if (captures && captures.length > 0) {
    captures.push(createNewCapturesObject(amount));
    return captures;
  }
  return [createNewCapturesObject(amount)];
};

export const createNewCapturesObject = (amount: number): paymentCapture => {
  return {
    captureId: crypto.randomUUID(),
    amount: amount,
    transactionStatusCode: 'CLOSED',
    captureRemainingRefundableAmount: amount,
  };
};
