import { useMemo, useState } from 'react';
import { Button, Group, Select, SimpleGrid, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Panel } from 'components';
import { validationSchema } from './utils/validationSchema';
import { usePaymentMethod } from '../hooks/usePaymentMethod';
import { convertToPaymentRequest } from './utils/convertToPaymentRequest';
import { convertToPaymentResponse } from './utils/convertToPaymentResponse';
import { IconDatabase } from '@tabler/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useCreatePayment } from '../hooks';
import { transactionManagementType } from 'shared.types';
import { AmountWithCurrencyInput } from './AmountWithCurrencyInput';
import { InferType } from 'yup';
import { captureMethod } from 'generated-api-models';

enum formStatesEnum {
  LOADING = 'Making a payment',
  INITIAL = 'Review & Submit',
  COMPLETE = 'Payment Created! Create another ',
}

export const AuthorizePaymentForm = ({
  transactionIds,
  setTransactionIds,
}: transactionManagementType) => {
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<formStatesEnum>(
    formStatesEnum.INITIAL,
  );

  const paymentMethodData = usePaymentMethod();
  // Initialize the form using the default values defined in validationSchema
  const form = useForm<InferType<typeof validationSchema>>({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const paymentMethodSelectData = paymentMethodData?.map(
    (paymentMethod, index) => {
      return {
        key: index,
        value: JSON.stringify(paymentMethod),
        label: paymentMethod.card
          ? paymentMethod.card.accountNumber.replace(/\d(?=\d{4})/g, '*')
          : '',
      };
    },
  );

  const paymentRequest = useMemo(
    () => convertToPaymentRequest(form.values),
    [form.values],
  );

  const paymentResponse = useMemo(
    () => convertToPaymentResponse(form.values),
    [form.values],
  );

  const { mutate: createPayment } = useCreatePayment();

  const onSubmit = () => {
    setFormState(formStatesEnum.LOADING);
    createPayment(
      {
        payment: paymentRequest,
        merchantId: '998482157632',
        requestId: crypto.randomUUID(),
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['payments', data.requestId], data);
          setTransactionIds([...transactionIds, data.requestId]);
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
  };

  const renderFormButton = () => {
    switch (formState) {
      case formStatesEnum.LOADING:
        return (
          <Button leftIcon={<IconDatabase size="1rem" />} loading>
            {formState}
          </Button>
        );
      case formStatesEnum.COMPLETE:
        return (
          <Button color="green.8" onClick={resetForm}>
            {formState}
          </Button>
        );
      default:
        return <Button type="submit">{formState}</Button>;
    }
  };

  return (
    <Panel
      title="Authorize a Payment"
      apiCallType="POST"
      apiEndpoint="/payments"
      requestBody={paymentRequest}
      responseBody={paymentResponse}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 'md', cols: 2 },
            { minWidth: 'lg', cols: 1 },
            { minWidth: 'xl', cols: 1 },
          ]}
        >
          <Stack>
            <Select
              label="Select Capture Method"
              placeholder="Choose Capture Method"
              required
              data={Object.keys(captureMethod)}
              {...form.getInputProps('captureMethod')}
            />
            <Select
              label="Select Payment Method"
              description="Information about the payment type"
              placeholder="Choose Payment Method"
              required
              data={paymentMethodSelectData}
              nothingFound="No payment methods"
              {...form.getInputProps('paymentMethod')}
            />
            <AmountWithCurrencyInput form={form} />
            <Group mt="xl" position="right">
              {renderFormButton()}
            </Group>
          </Stack>
        </SimpleGrid>
      </form>
    </Panel>
  );
};
