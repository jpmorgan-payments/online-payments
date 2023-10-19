import type { paymentResponse } from 'generated-api-models';

export const paymentAuthorizeResponseListMock: paymentResponse[] = [
  {
    transactionId: "7f6ab144-2d67-4c3d-ba10-58baa2bbfad3",
    requestId: "6a3ce185-a156-48c7-99a6-39fee8020bb5",
    transactionState: "AUTHORIZED",
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
    remainingRefundableAmount: 10,
    totalAuthorizedAmount: 10,
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
  },
  {
    transactionId: "a6de5c1c-8ab7-4e63-b4bf-b85845e0c0c9",
    requestId: "3ee8441b-5e7d-4f0e-b389-5b5ac8437680",
    transactionState: "CLOSED",
    responseStatus: "SUCCESS",
    responseCode: "APPROVED",
    responseMessage: "Transaction approved by Issuer",
    paymentMethodType: {
      card: {
        cardType: "VI",
        cardTypeName: "VISA",
        isBillPayment: true,
        accountNumber: "4112346356224113",
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
          networkTransactionId: "013272692164391",
          paymentAccountReference: "Q1J4Z28RKA1EBL470G9XYG90R5D3E",
        },
      }
    },
    captureMethod: "NOW",
    captureTime: "2023-09-29T19:17:05.745Z",
    initiatorType: "CARDHOLDER",
    accountOnFile: "NOT_STORED",
    isVoid: false,
    transactionDate: "2023-09-29T19:17:05.745Z",
    approvalCode: "tst484",
    hostMessage: "Approved",
    isAmountFinal: false,
    amount: 10,
    currency: "USD",
    remainingRefundableAmount: 10,
    remainingAuthAmount: 0,
    hostReferenceId: "701iHBA15JCoiKND3uAzN4",
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
      paymentRequestId: "a6de5c1c-8ab7-4e63-b4bf-b85845e0c0c9",
      paymentRequestStatus: "CLOSED",
      authorizations: [
        {
          authorizationId: "a6de5c1c-8ab7-4e63-b4bf-b85845e0c0c9",
          amount: 10,
          transactionStatusCode: "CAPTURED",
          authorizationType: "INITIAL"
        }
      ],
      captures: [
        {
          captureId: "a6de5c1c-8ab7-4e63-b4bf-b85845e0c0c9",
          amount: 10,
          transactionStatusCode: "CLOSED",
          captureRemainingRefundableAmount: 10
        }
      ]
    }
  },
  {
    transactionId: "6422b75e-1c4c-41a4-b9a5-427a2f99b799",
    requestId: "e1f810e5-ffd0-4ed3-a506-fecb60ce0527",
    transactionState: "AUTHORIZED",
    responseStatus: "SUCCESS",
    responseCode: "APPROVED",
    responseMessage: "Transaction approved by Issuer",
    paymentMethodType: {
      card: {
        cardType: "VI",
        cardTypeName: "VISA",
        isBillPayment: true,
        accountNumber: "4112346356224113",

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
          networkTransactionId: "013272692164630",
          paymentAccountReference: "Q1J4Z28RKA1EBL470G9XYG90R5D3E",
        },
      }
    },
    captureMethod: "MANUAL",
    initiatorType: "CARDHOLDER",
    accountOnFile: "NOT_STORED",
    isVoid: false,
    transactionDate: "2023-09-29T19:17:36.075Z",
    approvalCode: "tst820",
    hostMessage: "Approved",
    isAmountFinal: false,
    amount: 10,
    currency: "USD",
    remainingAuthAmount: 10,
    remainingRefundableAmount: 10,
    totalAuthorizedAmount: 10,
    hostReferenceId: "rbjhZXXQ0F2RWaqdC6Bsh2",
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
      paymentRequestId: "6422b75e-1c4c-41a4-b9a5-427a2f99b799",
      paymentRequestStatus: "PENDING",
      authorizations: [
        {
          authorizationId: "6422b75e-1c4c-41a4-b9a5-427a2f99b799",
          amount: 10,
          transactionStatusCode: "AUTHORIZED",
          authorizationType: "INITIAL"
        }
      ]
    }
  }
] as paymentResponse[];
