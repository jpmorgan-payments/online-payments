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
  amount?: number;
};

const convertToCaptureRequest = (values: formValuesType): captureRequest => {
  return {
    captureMethod: values.captureMethod,
  };
};

type CaptureAPaymentPanelProps = {
  data: paymentResponse;
  setModalOpened: (value: boolean) => void;
};
export const CaptureAPaymentPanel = ({
  data,
  setModalOpened,
}: CaptureAPaymentPanelProps) => {
  const [formState, setFormState] = useState<formStatesEnum>(
    formStatesEnum.INITIAL,
  );
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      amount: data.amount,
      captureMethod: data.captureMethod,
      captureType: captureTypeEnum.FULL.valueOf(),
    },
  });

  const { mutate: capturePayment } = useCapturePayment();

  const captureRequest = useMemo(
    () => convertToCaptureRequest(form.values),
    [form.values],
  );
  const captureResponse = useMemo(
    () => createCaptureResponse(data),
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

  const resetForm = () => {
    form.reset();
    setFormState(formStatesEnum.INITIAL);
    setModalOpened(false);
  };
  return (
    <Panel
      title="Capture a Payment"
      apiCallType="POST"
      apiEndpoint="/payments/{id}/captures"
      requestBody={captureRequest}
      responseBody={captureResponse}
    >
      {formState !== formStatesEnum.COMPLETE && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay
            visible={formState === formStatesEnum.LOADING}
            overlayBlur={2}
          />
          <Select
            data={Object.values(captureTypeEnum)}
            label="Select the capture type"
            {...form.getInputProps('captureType')}
            withAsterisk
          />
          <Select
            data={Object.values(captureMethod)}
            label="Capture Method"
            {...form.getInputProps('captureMethod')}
            readOnly
          />
          {form.values.captureType !== captureTypeEnum.FULL && (
            <NumberInput
              hideControls
              label="Enter capture amount"
              min={0}
              {...form.getInputProps('amount')}
            />
          )}

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
