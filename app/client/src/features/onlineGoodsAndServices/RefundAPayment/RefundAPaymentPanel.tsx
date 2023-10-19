import { Panel, SuccessAlert } from 'components';
import { useForm } from '@mantine/form';
import { paymentResponse, refund } from 'generated-api-models';
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
import { MERCHANT, MERCHANT_ID, PAYMENTS_REFUND_API } from 'data/constants';
import { useQueryClient } from '@tanstack/react-query';
import { createRefundResponse } from 'data/createRefundResponse';
import { useRefundPayment } from '../hooks';

enum RefundTypeEnum {
  FULL = 'Full',
  PARTIAL = 'Partial',
}

enum FormStateEnum {
  LOADING = 'Processing Refund',
  INITIAL = 'Create Refund',
  COMPLETE = 'Close',
}
type FormValueType = {
  refundType?: RefundTypeEnum;
  amount?: number;
};

type RefundAPaymentPanelProps = {
  data: paymentResponse;
  setModalOpened: (value: boolean) => void;
};

const convertToRefundRequest = (
  values: FormValueType,
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
  const [formState, setFormState] = useState<FormStateEnum>(
    FormStateEnum.INITIAL,
  );
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      refundType: RefundTypeEnum.FULL,
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
    setFormState(FormStateEnum.INITIAL);
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

  const { mutate: refundPayment } = useRefundPayment();

  const submitRefund = () => {
    refundPayment(
      {
        refund: refundRequest,
        merchantId: MERCHANT_ID,
        requestId: crypto.randomUUID(),
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
    setFormState(FormStateEnum.LOADING);
    submitRefund();
  };

  return (
    <Panel
      title="Create a refund"
      apiCallType="POST"
      apiEndpoint="/refunds"
      requestBody={refundRequest}
      responseBody={refundResponse}
    >
      <Text c="dimmed" fs="italic">
        This is the Refund a Payment API call. You can used this call to test
        out Full, Partial and Multi Refund payments. Once you submit it will
        update the JSON in the table below. Check out the API specification to
        find out more{' '}
        <Anchor href={PAYMENTS_REFUND_API} target="_blank">
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
          <Select
            data={Object.values(RefundTypeEnum)}
            label="Select the refund type"
            {...form.getInputProps('refundType')}
            withAsterisk
          />
          {form.values.refundType !== RefundTypeEnum.FULL && (
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
      {formState === FormStateEnum.COMPLETE && (
        <SuccessAlert
          title="Refund Successful"
          successText="You have refunded your payment. Check out the table below to see updated JSON."
          buttonText={formState}
          resetForm={resetForm}
        />
      )}
    </Panel>
  );
};
