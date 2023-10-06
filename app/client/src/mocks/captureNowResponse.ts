import { paymentResponse } from 'generated-api-models';

export const captureNowResponse: paymentResponse = {
  transactionId: 'e9468a04-7ad5-47ad-b2a8-cd3d76be0f6a',
  requestId: '252f0171-9512-4f54-94e5-5c046dc55eab',
  transactionState: 'CLOSED',
  responseCode: 'ACCEPTED',
  responseStatus: 'SUCCESS',
  responseMessage: 'Transaction accepted',
  paymentMethodType: {
    card: {
      cardType: 'VI',
      accountNumber: '',
      isBillPayment: true,
      maskedAccountNumber: '401200XXXXXX0026',
      cardTypeIndicators: {
        issuanceCountryCode: 'USA',
        isDurbinRegulated: false,
        cardProductTypes: ['COMMERCIAL', 'PINLESS_DEBIT'],
      },
      networkResponse: {
        networkTransactionId: '013094692162180',
        paymentAccountReference: 'Q1J4Z28RKA1EBL470G9XYG90R5D3E',
      },
    },
  },
  captureMethod: 'NOW',
  initiatorType: 'CARDHOLDER',
  accountOnFile: 'NOT_STORED',
  transactionDate: '2023-04-04T21:04:33.764Z',
  isAmountFinal: true,
  amount: 100,
  currency: 'USD',
  remainingRefundableAmount: 100,
  remainingAuthAmount: 1134,
  hostReferenceId: 'aTWjsNr8fCy2ZjS6LdpEm',
  merchant: {
    merchantId: '000017904371',
    merchantSoftware: {
      companyName: 'Payment Company',
      productName: 'Application Name',
      version: '1.235',
    },
    merchantCategoryCode: '4899',
  },
  paymentRequest: {
    paymentRequestId: 'e9468a04-7ad5-47ad-b2a8-cd3d76be0f6a',
    paymentRequestStatus: 'OPEN',
    authorizations: [
      {
        authorizationId: 'e9468a04-7ad5-47ad-b2a8-cd3d76be0f6a',
        amount: 1234,
        transactionStatusCode: 'AUTHORIZED',
        authorizationType: 'INITIAL',
      },
    ],
    captures: [
      {
        captureId: 'e9468a04-7ad5-47ad-b2a8-cd3d76be0f6a',
        amount: 100,
        transactionStatusCode: 'CLOSED',
        captureRemainingRefundableAmount: 100,
      },
    ],
  },
} as paymentResponse;
