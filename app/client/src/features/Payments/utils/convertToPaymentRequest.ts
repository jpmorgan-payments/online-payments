import type { InferType } from 'yup';
import type { merchant, payment, paymentMethodType } from 'generated-api-models';
import type { validationSchema } from './validationSchema';


export function convertToPaymentRequest(
  values: InferType<typeof validationSchema>,
  merchant?: merchant,
  paymentMethodType? : paymentMethodType
) {
  return {
    captureMethod: 'NOW',
    amount: Number(values.amount),
    currency: "USD",
    merchant: merchant ?? {
      "merchantSoftware": {
        "companyName": " ",
        "productName": " ",
        "version": " "
      },
    },
    paymentMethodType: paymentMethodType ?? {
      "card": {
        "accountNumber": "",
        "expiry": {
          "month": 5,
          "year": 2027
        },
        "isBillPayment": true
      }
    },

    initiatorType: "CARDHOLDER",
    accountOnFile: "NOT_STORED",
    isAmountFinal: true
  }

}
