import type { paymentResponse } from 'generated-api-models';

export const paymentAuthorizeResponseMock: paymentResponse =   {
  transactionId: "7f6ab144-2d67-4c3d-ba10-58baa2bbfad3",
  requestId: "6a3ce185-a156-48c7-99a6-39fee8020bb5",
  transactionState: 'AUTHORIZED',
  responseStatus: "SUCCESS",
  responseCode: "APPROVED",
  responseMessage: "Transaction approved by Issuer",
  paymentMethodType: {
    card: {
      accountNumber: "4112346356224113",
      cardType: "VI",
      cardTypeName: "VISA",
      isBillPayment: true,
      maskedAccountNumber: "411234XXXXXX4113",
      cardTypeIndicators: {
        issuanceCountryCode: "USA",
        isDurbinRegulated: false,
        cardProductTypes: [
          "COMMERCIAL",
          "PINLESS_DEBIT"
        ]
      },
      networkResponse: {
        addressVerificationResult: "NOT_REQUESTED",
        networkTransactionId: "013272692163671",
        paymentAccountReference: "Q1J4Z28RKA1EBL470G9XYG90R5D3E"
      },
    }
  },
  captureMethod: "DELAYED",
  captureTime: "2023-09-29T20:14:32.105Z",
  initiatorType: "CARDHOLDER",
  accountOnFile: "NOT_STORED",
  isVoid: false,
  transactionDate: "2023-09-29T19:14:32.105Z",
  approvalCode: "tst303",
  hostMessage: "Approved",
  isAmountFinal: false,
  amount: 10,
  currency: "USD",
  remainingAuthAmount: 10,
  hostReferenceId: "50ONBgm2t6FSGzoC3Ncyl1",
  merchant: {
    merchantId: "000017904371",
    merchantSoftware: {
      companyName: "Payment Company",
      productName: "Application Name",
      version: "1.235"
    },
    merchantCategoryCode: "4899"
  },
  paymentRequest: {
    paymentRequestId: "7f6ab144-2d67-4c3d-ba10-58baa2bbfad3",
    paymentRequestStatus: "PENDING",
    authorizations: [
      {
        authorizationId: "7f6ab144-2d67-4c3d-ba10-58baa2bbfad3",
        amount: 10,
        transactionStatusCode: "AUTHORIZED",
        authorizationType: "INITIAL"
      }
    ]
  }
} as paymentResponse;
