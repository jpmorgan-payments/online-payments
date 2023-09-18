import type { paymentResponse } from 'generated-api-models';

export const paymentAuthorizeResponseMock: paymentResponse = {
  transactionId: 'cdf62f90-6440-496f-817c-c05dd3b7b01a',
  requestId: '5e720ee0-0192-4f7f-82d9-6248096832a0',
  transactionState: 'VOIDED',
  responseStatus: 'SUCCESS',
  responseCode: 'APPROVED',
  responseMessage: 'Transaction approved by Issuer',
  paymentMethodType: {
    card: {
      expiry: {
        month: 5,
        year: 2027,
      },
      cardType: 'VI',
      cardTypeName: 'VISA',
      isBillPayment: true,
      maskedAccountNumber: '411234XXXXXX4113',
      cardTypeIndicators: {
        issuanceCountryCode: 'USA',
        isDurbinRegulated: false,
        cardProductTypes: ['PINLESS_DEBIT'],
      },
      networkResponse: {
        addressVerificationResult: 'NOT_REQUESTED',
        addressVerificationResultCode: '',
        cardVerificationResultCode: '',
      },
    },
  },
  captureMethod: 'NOW',
  isCapture: true,
  initiatorType: 'CARDHOLDER',
  accountOnFile: 'NOT_STORED',
  transactionDate: '2022-05-04T16:04:27.027Z',
  approvalCode: 'tst269',
  hostMessage: 'Approved',
  amount: 1234,
  currency: 'USD',
  remainingRefundableAmount: 1234,
  remainingAuthAmount: 1234,
  hostReferenceId: 'NjKmDGcGYAJ6wsedRnMCj4',
  merchant: {
    merchantId: '17904369',
    merchantSoftware: {
      companyName: 'Payment Company',
      productName: 'Application Name',
      version: '1.235',
    },
    merchantCategoryCode: '4899',
  },
} as paymentResponse;
