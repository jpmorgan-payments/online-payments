import type {  paymentMethodType } from 'generated-api-models';
import { paymentMethodMock } from 'mocks/paymentMethod.mock';


//TODO for now lets hardcode payment example data
export function usePaymentMethod():
  paymentMethodType[]
 {
  return paymentMethodMock
}