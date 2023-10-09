import { refundResponse } from 'generated-api-models';

export const paymentRefundResponse: refundResponse = {
  transactionId: '7b27c7d4-a69d-49f5-98d5-291fbb242bb2',
  requestId: '12cc0270-7bed-11e9-a188-1763956dd7f6',
  transactionState: 'CLOSED',
  amount: 1234,
  currency: 'USD',
  responseStatus: 'SUCCESS',
  responseCode: 'ACCEPTED',
  responseMessage: 'Transaction approved by Issuer',
  remainingRefundableAmount: 0,
  approvalCode: 'tst683',
  hostMessage: 'Approved',
  initiatorType: 'CARDHOLDER',
  accountOnFile: 'NOT_STORED',
  transactionDate: '2022-06-15T13:03:45.507Z',
  merchant: {
    merchantId: '998482157632',
    merchantSoftware: {
      companyName: 'Payment Company',
      productName: 'Application Name',
      version: '1.235',
    },
    merchantCategoryCode: '4899',
  },
  paymentMethodType: {
    card: {
      cardTypeName: 'VISA',
      originalNetworkTransactionId: '1c4b1100-4017-11e9-b649-8de064224186',
      maskedAccountNumber: '411234XXXXXX4113',
      accountNumber: '4112346356224113',
      maskedCardNumber: '1c4b1100-4017-11e9-b649-8de064224186',
    },
  },
  hostReferenceId: 'nw4Rp6yw6vPN1mnl9uogi7',
} as refundResponse;
