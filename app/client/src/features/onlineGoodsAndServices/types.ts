import { paymentResponse, transactionState } from 'generated-api-models';

export type formModalType = {
  formData?: paymentResponse;
  formType?: formTypes;
};

export enum formTypes {
  VERIFY = 'Verify',
  REFUND = 'Refund',
  VOID = 'Void',
  CAPTURE = 'Capture',
}
