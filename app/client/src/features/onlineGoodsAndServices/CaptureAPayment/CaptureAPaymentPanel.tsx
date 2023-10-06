import { Panel } from 'components';
import { useForm } from '@mantine/form';
import {
  captureMethod,
  captureRequest,
  paymentResponse,
} from 'generated-api-models';
import { NumberInput, Select, Group, Button } from '@mantine/core';
import { captureRequestFullMock } from 'mocks/captures/captureRequest.mock';
import { useState, useMemo } from 'react';
import { useCapturePayment } from '../hooks/useCapturePayment';
import { MERCHANT_ID } from 'data/constants';
import { useQueryClient } from '@tanstack/react-query';

enum formStatesEnum {
  LOADING = 'Capturing Payment',
  INITIAL = 'Capture Payment',
  COMPLETE = 'Continue',
}

type formValuesType = {
  captureMethod?: captureMethod;
  amount?: number;
};

const convertToCaptureRequest = (values: formValuesType): captureRequest => {
  return {
    captureMethod: values.captureMethod,
  };
};

export const CaptureAPaymentPanel = ({ data }: { data: paymentResponse }) => {
  const [formState, setFormState] = useState<formStatesEnum>(
    formStatesEnum.INITIAL,
  );
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      amount: data.amount,
      captureMethod: data.captureMethod,
    },
  });

  const { mutate: capturePayment } = useCapturePayment();

  const captureRequest = useMemo(
    () => convertToCaptureRequest(form.values),
    [form.values],
  );
  const handleSubmit = () => {
    setFormState(formStatesEnum.LOADING);
    capturePayment(
      {
        capture: captureRequest,
        merchantId: MERCHANT_ID,
        requestId: crypto.randomUUID(),
        transactionId: data.transactionId,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['payments', data.transactionId], data);
        },
        onSettled: () => {
          setFormState(formStatesEnum.COMPLETE);
        },
      },
    );
  };

  return (
    <Panel
      title="Capture a Payment"
      apiCallType="POST"
      apiEndpoint="/payments/{id}/captures"
      requestBody={captureRequest}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          data={Object.keys(captureMethod)}
          label="Capture Method"
          {...form.getInputProps('captureMethod')}
          withAsterisk
          readOnly
        />
        {data.captureMethod === captureMethod.NOW && (
          <NumberInput hideControls min={0} {...form.getInputProps('amount')} />
        )}

        <Group mt="xl" position="right">
          <Button type="submit">{formState}</Button>
        </Group>
      </form>
    </Panel>
  );
};
