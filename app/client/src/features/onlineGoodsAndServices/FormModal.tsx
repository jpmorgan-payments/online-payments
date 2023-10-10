import { Modal } from '@mantine/core';
import { formModalType, formTypes } from './types';
import { paymentResponse } from 'generated-api-models';
import { CaptureAPaymentPanel } from './CaptureAPayment/CaptureAPaymentPanel';
import { VoidAPaymentPanel } from './VoidAPayment/VoidAPaymentPanel';

type formModalProps = {
  data: formModalType;
} & {
  modalOpened: boolean;
  setModalOpened: (value: boolean) => void;
};
export const FormModal = ({
  data,
  modalOpened,
  setModalOpened,
}: formModalProps) => {
  const { formData, formType } = data;

  const renderPanel = (data: paymentResponse) => {
    switch (formType) {
      case formTypes.CAPTURE:
        return (
          <CaptureAPaymentPanel data={data} setModalOpened={setModalOpened} />
        );
      case formTypes.REFUND:
        return;
      case formTypes.VOID:
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
