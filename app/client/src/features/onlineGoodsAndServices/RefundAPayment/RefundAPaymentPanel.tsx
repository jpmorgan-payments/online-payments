import { Panel, SuccessAlert } from 'components';
import { useForm } from '@mantine/form';
import { paymentResponse, refund } from 'generated-api-models';
import {
  NumberInput,
  Select,
  Group,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { useState, useMemo } from 'react';
import { MERCHANT } from 'data/constants';
import { useQueryClient } from '@tanstack/react-query';
import { createRefundResponse } from 'data/createRefundResponse';

enum refundTypeEnum {
  FULL = 'Full',
  PARTIAL = 'Partial',
  MULTI_CAPTURE = 'Multi-Capture',
}

enum formStatesEnum {
  LOADING = 'Processing Refund',
  INITIAL = 'Create Refund',
  COMPLETE = 'Close',
}
type formValuesType = {
  refundType?: refundTypeEnum;
  amount?: number;
};

type RefundAPaymentPanelProps = {
  data: paymentResponse;
  setModalOpened: (value: boolean) => void;
};

const convertToRefundRequest = (
  values: formValuesType,
  data: paymentResponse,
): refund => {
  return {
    merchant: data.merchant || MERCHANT,
    amount: values.amount || data.amount,
    currency: data.currency,
    paymentMethodType: {
      transactionReference: {
        transactionReferenceId: data.transactionId,
      },
    },
  };
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
    initialValues: {
      refundType: refundTypeEnum.FULL,
      amount: data.amount,
    },
    validate: {
      amount: (value) =>
        value && value > 0 && data.amount && data.amount - value >= 0
          ? null
          : `You can't refund more than the original amount (${data.amount})`,
    },
  });

  const resetForm = () => {
    form.reset();
    setFormState(formStatesEnum.INITIAL);
    setModalOpened(false);
  };

  const refundRequest = useMemo(
    () => convertToRefundRequest(form.values, data),
    [form.values],
  );
  const refundResponse = useMemo(
    () => createRefundResponse(refundRequest, data),
    [form.values],
  );

  return (
    <Panel
      title="Create a refund"
      apiCallType="POST"
      apiEndpoint="/refunds"
      requestBody={refundRequest}
      responseBody={refundResponse}
    >
      {formState !== formStatesEnum.COMPLETE && (
        <form onSubmit={form.onSubmit(() => console.log('here'))}>
          <LoadingOverlay
            visible={formState === formStatesEnum.LOADING}
            overlayBlur={2}
          />
          <Select
            data={Object.values(refundTypeEnum)}
            label="Select the refund type"
            {...form.getInputProps('refundType')}
            withAsterisk
          />
          {form.values.refundType !== refundTypeEnum.FULL && (
            <NumberInput
              label="Enter refund amount"
              withAsterisk
              hideControls
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
