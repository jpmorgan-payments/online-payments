import type { paymentResponse } from 'generated-api-models';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';
//TODO for now lets hardcode merchant example data
export function usePaymentResponse(): paymentResponse[] {


  return [paymentAuthorizeResponseMock];
}
