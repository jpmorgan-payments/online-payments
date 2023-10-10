import { Panel, SuccessAlert } from 'components';
import { useForm } from '@mantine/form';
import { paymentResponse } from 'generated-api-models';
import { Group, Button, LoadingOverlay } from '@mantine/core';
import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MERCHANT_ID } from 'data/constants';
import { useVoidPayment } from '../hooks/useVoidPayment';

enum formStatesEnum {
  LOADING = 'Voiding Payment',
  INITIAL = 'Void Payment',
  COMPLETE = 'Close',
}
type VoidAPaymentPanelProps = {
  data: paymentResponse;
  setModalOpened: (value: boolean) => void;
};
export const VoidAPaymentPanel = ({
  data,
  setModalOpened,
}: VoidAPaymentPanelProps) => {
  const [formState, setFormState] = useState<formStatesEnum>(
    formStatesEnum.INITIAL,
  );
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      isVoid: true,
    },
  });
  const voidRequest = useMemo(
    () => ({
      isVoid: true,
    }),
    [form.values],
  );

  const resetForm = () => {
    form.reset();
    setFormState(formStatesEnum.INITIAL);
    setModalOpened(false);
  };

  const { mutate: voidPayment } = useVoidPayment();

  const handleSubmit = () => {
    setFormState(formStatesEnum.LOADING);
    voidPayment(
      {
        voidRequest: voidRequest,
        transactionId: data.transactionId,
        merchantId: MERCHANT_ID,
        requestId: crypto.randomUUID(),
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['void', data.transactionId], data);
        },
        onSettled: () => {
          setFormState(formStatesEnum.COMPLETE);
        },
      },
    );
  };

  return (
    <Panel
      title="Void a Payment"
      apiCallType="PATCH"
      apiEndpoint="/payments/{id}"
      requestBody={voidRequest}
    >
      {formState !== formStatesEnum.COMPLETE && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
