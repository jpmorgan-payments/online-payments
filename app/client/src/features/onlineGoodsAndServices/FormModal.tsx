import { Modal } from '@mantine/core';
import { FormModalType, FormTypes } from './types';
import { paymentResponse } from 'generated-api-models';
import { CaptureAPaymentPanel } from './CaptureAPayment/CaptureAPaymentPanel';
import { VoidAPaymentPanel } from './VoidAPayment/VoidAPaymentPanel';
import { RefundAPaymentPanel } from './RefundAPayment/RefundAPaymentPanel';

type FormModalProps = {
  data: FormModalType;
} & {
  modalOpened: boolean;
  setModalOpened: (value: boolean) => void;
};
export const FormModal = ({
  data,
  modalOpened,
  setModalOpened,
}: FormModalProps) => {
  const { formData, formType } = data;

  const renderPanel = (data: paymentResponse) => {
    switch (formType) {
      case FormTypes.CAPTURE:
        return (
          <CaptureAPaymentPanel data={data} setModalOpened={setModalOpened} />
        );
      case FormTypes.REFUND:
        return (
          <RefundAPaymentPanel data={data} setModalOpened={setModalOpened} />
        );
        case FormTypes.VOID:
          return (
            <VoidAPaymentPanel data={data} setModalOpened={setModalOpened} />
          );
      default:
        return;
    }
  };
  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      size="auto"
    >
      {formData && renderPanel(formData)}
    </Modal>
  );
};
