import type { InferType } from 'yup';
import type { paymentResponse } from 'generated-api-models';
import type { validationSchema } from './validationSchema';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';
import { createPaymentResponse } from 'data/createPaymentResponse';

// This data would be returned from your payment post request. We are mocking it out for showcase purposes.
export function convertToPaymentResponse(
  values: InferType<typeof validationSchema>,
) {
 return  createPaymentResponse({
    merchantId: '998482157632',
    merchant: {
      merchantSoftware: {
        companyName: 'Payment Company',
        productName: 'Application Name',
        version: '1.235',
      },
      merchantCategoryCode: '4899',
    },
    requestId: crypto.randomUUID(),
    amount: values.amount,
    paymentMethodType: JSON.parse(values.paymentMethod),
    currency: values.currency,
    captureMethod: values.captureMethod,
    isAmountFinal: values.isAmountFinal,
    initiatorType: values.initiatorType

  });
}
