import type { paymentResponse } from 'generated-api-models';

export const paymentAuthorizeResponseListMock: paymentResponse[] = [
  {
    transactionId: '28e05e0c-dd0e-40d2-8078-d96420f3d2e6',
    requestId: '07e47a3f-8954-42a9-90ce-892b1fc86e1f',
    transactionState: 'VOIDED',
    responseStatus: 'SUCCESS',
    responseCode: 'APPROVED',
    responseMessage: 'Transaction approved by Issuer',
    paymentMethodType: {
      card: {
        accountNumber: '4012000033330026',
        expiry: {
          month: 5,
          year: 2027,
        },
        isBillPayment: true,
      },
    },
    captureMethod: 'NOW',
    isCapture: true,
    initiatorType: 'CARDHOLDER',
    accountOnFile: 'NOT_STORED',
    transactionDate: '2022-05-04T16:04:27.027Z',
    approvalCode: 'tst269',
    hostMessage: 'Approved',
    amount: 11,
    currency: 'USD',
    remainingRefundableAmount: 1234,
    remainingAuthAmount: 1234,
    hostReferenceId: 'NjKmDGcGYAJ6wsedRnMCj4',
    merchant: {
      merchantId: '998482157632',
      merchantSoftware: {
        companyName: 'Payment Company',
        productName: 'Application Name',
        version: '1.235',
      },
      merchantCategoryCode: '4899',
    },
  },
] as paymentResponse[];
