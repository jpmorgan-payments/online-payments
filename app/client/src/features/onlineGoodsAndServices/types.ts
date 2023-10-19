import { paymentResponse } from 'generated-api-models';

export type FormModalType = {
  formData?: paymentResponse;
  formType?: FormTypes;
};

export enum FormTypes {
  REFUND = 'Refund',
  VOID = 'Void',
  CAPTURE = 'Capture',
}
