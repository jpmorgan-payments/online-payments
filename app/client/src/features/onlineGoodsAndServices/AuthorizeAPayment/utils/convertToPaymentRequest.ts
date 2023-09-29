import type { InferType } from 'yup';
import type { payment } from 'generated-api-models';
import { type validationSchema } from './validationSchema';

export function convertToPaymentRequest(
  values: InferType<typeof validationSchema>,
) {
  const defaultResponse: payment = {
    captureMethod: values.captureMethod,
    amount: values.amount,
    currency: values.currency,
    paymentMethodType: JSON.parse(values.paymentMethod),
    initiatorType: values.initiatorType,
    accountOnFile: 'NOT_STORED',
    isAmountFinal: values.isAmountFinal,
    merchant: {
      merchantSoftware: {
        companyName: 'Payment Company',
        productName: 'Application Name',
        version: '1.235',
      },
      merchantCategoryCode: '4899',
    },
  } as payment;
  return defaultResponse;
}
