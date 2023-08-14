import type { InferType } from 'yup';
import type { merchant, paymentMethodType } from 'generated-api-models';
import type { validationSchema } from './validationSchema';


const defaultMerchant = {
  merchantId: '',
  "merchantSoftware": {
    "companyName": " ",
    "productName": " ",
    "version": " "
  },
}

export function convertToPaymentRequest(
  values: InferType<typeof validationSchema>,
  merchant?: merchant,
  paymentMethodType? : paymentMethodType
) {
  const  {merchantId, ...merchantRequest} = merchant || defaultMerchant
  return {
    captureMethod: 'NOW',
    amount: Number(values.amount),
    currency: "USD",
    merchant: merchantRequest,
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
