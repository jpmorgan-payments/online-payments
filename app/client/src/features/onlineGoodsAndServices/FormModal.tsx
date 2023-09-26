import { Modal } from '@mantine/core';
import { formModalType } from './types';
import { Panel } from 'components';

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
  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      title={formType}
    >
      <Panel
        title="Authorize a Payment"
        apiCallType="POST"
        apiEndpoint="/payments"
        requestBody={formData}
      ></Panel>
      {/* Modal content */}
    </Modal>
  );
};
