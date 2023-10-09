import { Panel, SuccessAlert } from 'components';
import { useForm } from '@mantine/form';
import {
  captureMethod,
  captureRequest,
  paymentResponse,
} from 'generated-api-models';
import {
  NumberInput,
  Select,
  Group,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { useState, useMemo } from 'react';
import { useCapturePayment } from '../hooks/useCapturePayment';
import { MERCHANT_ID } from 'data/constants';
import { useQueryClient } from '@tanstack/react-query';
import { createCaptureResponse } from 'data/createCaptureResponse';

enum formStatesEnum {
  LOADING = 'Capturing Payment',
  INITIAL = 'Capture Payment',
  COMPLETE = 'Close',
}

enum captureTypeEnum {
  FULL = 'Full',
  PARTIAL = 'Partial',
  MULTI_CAPTURE = 'Multi-Capture',
}

type formValuesType = {
  captureMethod?: captureMethod;
  captureType?: string;
  amount?: number;
  multiCaptureRecordCount?: number;
};

type RefundAPaymentPanelProps = {
  data: paymentResponse;
  setModalOpened: (value: boolean) => void;
};
export const RefundAPaymentPanel = ({
  data,
  setModalOpened,
}: RefundAPaymentPanelProps) => {
  const [formState, setFormState] = useState<formStatesEnum>(
    formStatesEnum.INITIAL,
  );
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {},
  });

  const resetForm = () => {
    form.reset();
    setFormState(formStatesEnum.INITIAL);
    setModalOpened(false);
  };

  return (
    <Panel title="Create a refund" apiCallType="POST" apiEndpoint="/refunds">
      {formState !== formStatesEnum.COMPLETE && (
        <form onSubmit={form.onSubmit(() => console.log('here'))}>
          <LoadingOverlay
            visible={formState === formStatesEnum.LOADING}
            overlayBlur={2}
          />

          <Group mt="xl" position="right">
            <Button type="submit">{formState}</Button>
          </Group>
        </form>
      )}
      {formState === formStatesEnum.COMPLETE && (
        <SuccessAlert
          title="Capture Successful"
          successText="You have captured your payment. Check out the table below to see updated JSON."
          buttonText={formState}
          resetForm={resetForm}
        />
      )}
    </Panel>
  );
};
