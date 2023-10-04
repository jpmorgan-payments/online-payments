import { paymentResponse } from 'generated-api-models';

export type formModalType = {
  formData?: paymentResponse;
  formType?: formTypes;
};

export enum formTypes {
  REFUND = 'Refund',
  VOID = 'Void',
  CAPTURE = 'Capture',
}
