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
import { MultiCaptureLoader } from './MultiCaptureLoader';

enum formStatesEnum {
  LOADING = 'Capturing Payment',
  LOADING_MULTI = 'loading',
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

const convertToCaptureRequest = (values: formValuesType): captureRequest => {
  if (values.captureType === captureTypeEnum.PARTIAL) {
    return {
      captureMethod: values.captureMethod,
      amount: values.amount,
    };
  }
  if (values.captureType === captureTypeEnum.MULTI_CAPTURE) {
    return {
      captureMethod: values.captureMethod,
      amount: values.amount,
      multiCapture: {
        multiCaptureSequenceNumber: '1',
        multiCaptureRecordCount: values.multiCaptureRecordCount,
        isFinalCapture: false,
      },
    };
  }
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
      captureMethod: captureMethod.NOW,
      captureType: captureTypeEnum.FULL,
      multiCaptureRecordCount: 2,
    },
  });

  const { mutate: capturePayment } = useCapturePayment();

  const captureRequest = useMemo(
    () => convertToCaptureRequest(form.values),
    [form.values],
  );
  const captureResponse = useMemo(
    () => createCaptureResponse(data, captureRequest),
    [form.values],
  );

  const submitCapture = (multiCaptureSequenceNumber?: number) => {
    capturePayment(
      {
        capture: captureRequest,
        merchantId: MERCHANT_ID,
        requestId: crypto.randomUUID(),
        transactionId: data.transactionId,
        multiCaptureSequenceNumber: multiCaptureSequenceNumber,
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
  const handleSubmit = () => {
    //As this is multi capture we need to send the request multiple times with differing sequence numbers
    if (form.values.captureType === captureTypeEnum.MULTI_CAPTURE) {
      setFormState(formStatesEnum.LOADING_MULTI);
      [...Array(form.values.multiCaptureRecordCount)].forEach(
        (_, multiCaptureSequenceNumber) => {
          submitCapture(multiCaptureSequenceNumber);
        },
      );
    } else {
      setFormState(formStatesEnum.LOADING);

      submitCapture();
    }
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
          <LoadingOverlay
            visible={formState === formStatesEnum.LOADING_MULTI}
            overlayBlur={2}
            loader={
              <MultiCaptureLoader
                requestCount={form.values.multiCaptureRecordCount}
              />
            }
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

          {form.values.captureType === captureTypeEnum.MULTI_CAPTURE && (
            <NumberInput
              hideControls
              label="Enter total number of shipments to fulfill the order"
              min={0}
              {...form.getInputProps('multiCaptureRecordCount')}
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
