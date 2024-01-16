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
  Text,
  Anchor,
} from '@mantine/core';
import { useState, useMemo } from 'react';
import { useCapturePayment } from '../hooks/useCapturePayment';
import { MERCHANT_ID, PAYMENTS_CAPTURE_API } from 'data/constants';
import { useQueryClient } from '@tanstack/react-query';
import { createCaptureResponse } from 'data/createCaptureResponse';
import { MultiCaptureLoader } from './MultiCaptureLoader';

enum FormStateEnum {
  LOADING = 'Capturing Payment',
  LOADING_MULTI = 'loading',
  INITIAL = 'Capture Payment',
  COMPLETE = 'Close',
}

enum CaptureTypeEnum {
  FULL = 'Full',
  PARTIAL = 'Partial',
  MULTI_CAPTURE = 'Multi-Capture',
}

type FormValuesType = {
  captureMethod?: captureMethod;
  captureType?: string;
  amount?: number;
  multiCaptureRecordCount?: number;
};

const convertToCaptureRequest = (values: FormValuesType): captureRequest => {
  if (values.captureType === CaptureTypeEnum.PARTIAL) {
    return {
      captureMethod: values.captureMethod,
      amount: values.amount,
    };
  }
  if (values.captureType === CaptureTypeEnum.MULTI_CAPTURE) {
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
  const [formState, setFormState] = useState<FormStateEnum>(
    FormStateEnum.INITIAL,
  );
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      amount: data.amount,
      captureMethod: captureMethod.NOW,
      captureType: CaptureTypeEnum.FULL,
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
          setFormState(FormStateEnum.COMPLETE);
        },
      },
    );
  };
  const handleSubmit = () => {
    //As this is multi capture we need to send the request multiple times with differing sequence numbers
    if (form.values.captureType === CaptureTypeEnum.MULTI_CAPTURE) {
      setFormState(FormStateEnum.LOADING_MULTI);

      [...Array(form.values.multiCaptureRecordCount)].forEach(
        (_, multiCaptureSequenceNumber) => {
          submitCapture(multiCaptureSequenceNumber);
        },
      );
    } else {
      setFormState(FormStateEnum.LOADING);

      submitCapture();
    }
  };

  const resetForm = () => {
    form.reset();
    setFormState(FormStateEnum.INITIAL);
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
      <Text c="dimmed" fs="italic">
        This is the Capture a Payment API call. You can used this call to test
        out Full, Partial and Multi Capture payments. Once you submit it will
        update the JSON in the table below. Check out the API specification to
        find out more <br />
        <Anchor href={PAYMENTS_CAPTURE_API} target="_blank">
          here.
        </Anchor>
      </Text>
      <br />
      {formState !== FormStateEnum.COMPLETE && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay
            visible={formState === FormStateEnum.LOADING}
            overlayBlur={2}
          />
          <LoadingOverlay
            visible={formState === FormStateEnum.LOADING_MULTI}
            overlayBlur={2}
            loader={
              <MultiCaptureLoader
                requestCount={form.values.multiCaptureRecordCount}
              />
            }
          />
          <Select
            data={Object.values(CaptureTypeEnum)}
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
          {form.values.captureType !== CaptureTypeEnum.FULL && (
            <NumberInput
              hideControls
              label="Enter capture amount"
              min={0}
              {...form.getInputProps('amount')}
            />
          )}

          {form.values.captureType === CaptureTypeEnum.MULTI_CAPTURE && (
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
      {formState === FormStateEnum.COMPLETE && (
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
