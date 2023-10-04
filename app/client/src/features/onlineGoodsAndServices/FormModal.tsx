import { Modal } from '@mantine/core';
import { formModalType, formTypes } from './types';
import { CaptureAPaymentForm } from './CaptureAPayment/CaptureAPaymentForm';
import { paymentResponse } from 'generated-api-models';
import { CaptureAPaymentPanel } from './CaptureAPayment/CaptureAPaymentPanel';

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
        return <CaptureAPaymentPanel data={data} />;
      case formTypes.REFUND:
        return <CaptureAPaymentForm data={data} />;
      case formTypes.VOID:
        return <CaptureAPaymentForm data={data} />;
      default:
        return <CaptureAPaymentForm data={data} />;
    }
  };
  return (
    <Modal opened={modalOpened} onClose={() => setModalOpened(false)} size="xl">
      {formData && renderPanel(formData)}
    </Modal>
  );
};
