import { Panel, SuccessAlert } from 'components';
import { useForm } from '@mantine/form';
import { paymentResponse } from 'generated-api-models';
import { Group, Button, LoadingOverlay, Text, Anchor } from '@mantine/core';
import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MERCHANT_ID, PAYMENTS_VOID_API } from 'data/constants';
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

  const voidResponse = useMemo(() => {
    const response = data;
    response.isVoid = true;
    return response;
  }, [form.values]);

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
      title="Void a Payment"
      apiCallType="PATCH"
      apiEndpoint="/payments/{id}"
      requestBody={voidRequest}
      responseBody={voidResponse}
    >
      <Text c="dimmed" fs="italic">
        This is the Void a Payment API call. You can used this call to test out
        vodiing any authorized payments. Once you submit it will update the JSON
        in the table below. Check out the API specification to find out more{' '}
        <Anchor href={PAYMENTS_VOID_API} target="_blank">
          here.
        </Anchor>
      </Text>
      <br />
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
          title="Void Successful"
          successText="You have voided your payment. Check out the table below to see updated JSON."
          buttonText={formState}
          resetForm={resetForm}
        />
      )}
    </Panel>
  );
};
