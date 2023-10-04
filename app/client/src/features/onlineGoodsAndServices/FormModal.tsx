import { Modal } from '@mantine/core';
import { formModalType, formTypes } from './types';
import { Panel } from 'components';
import { CaptureAPaymentForm } from './CaptureAPayment/CaptureAPaymentForm';
import { paymentResponse } from 'generated-api-models';

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

  const renderForm = (data: paymentResponse) => {
    switch (formType) {
      case formTypes.CAPTURE:
        return <CaptureAPaymentForm data={data} />;
      case formTypes.REFUND:
        return <CaptureAPaymentForm data={data} />;
      case formTypes.VOID:
        return <CaptureAPaymentForm data={data} />;
      default:
        return <CaptureAPaymentForm data={data} />;
    }
  };
  return (
    <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
      <Panel
        title={`${formType} a Payment`}
        apiCallType="POST"
        apiEndpoint="/payments"
        requestBody={formData}
      >
        {formData && renderForm(formData)}
      </Panel>
    </Modal>
  );
};
