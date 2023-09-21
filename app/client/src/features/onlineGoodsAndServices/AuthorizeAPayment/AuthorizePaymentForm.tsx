import { useMemo, useState } from 'react';
import {
  Button,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Panel } from 'components';
import { validationSchema } from './utils/validationSchema';
import { useMerchants } from '../hooks/useMerchants';
import { usePaymentMethod } from '../hooks/usePaymentMethod';
import { convertToPaymentRequest } from './utils/convertToPaymentRequest';
import type { payment, paymentResponse } from 'generated-api-models';
import { convertToPaymentResponse } from './utils/convertToPaymentResponse';
import { IconDatabase } from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreatePayment } from '../hooks';

enum formStatesEnum {
  LOADING = 'Making a payment',
  INITIAL = 'Review & Submit',
  COMPLETE = 'Payment Created. Create another one now',
}

export const AuthorizePaymentForm = ({
  transactionIds,
  setTransactionIds,
}: {
  transactionIds: string[];
  setTransactionIds: (transactionId: string[]) => void;
}) => {
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<formStatesEnum>(
    formStatesEnum.INITIAL,
  );

  const merchantData = useMerchants();
  const paymentMethodData = usePaymentMethod();
  // Initialize the form using the default values defined in validationSchema
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const merchantSelectData = merchantData?.map((merchant, index) => {
    return {
      key: index,
      value: merchant.merchantId + '',
      label:
        merchant.merchantId + ' - ' + merchant.merchantSoftware.companyName,
    };
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

  const selectedMerchant = useMemo(
    () =>
      merchantData.find(
        (merchant) => merchant.merchantId === form.values.merchantId,
      ),
    [form.values.merchantId, merchantData],
  );

  const paymentRequest = useMemo(
    () => convertToPaymentRequest(form.values, selectedMerchant),
    [form.values],
  );

  const paymentResponse = useMemo(
    () => convertToPaymentResponse(form.values, selectedMerchant),
    [form.values],
  );

  const { mutate: createPayment } = useCreatePayment();

  const onSubmit = () => {
    setFormState(formStatesEnum.LOADING);
    createPayment(
      {
        payment: paymentRequest,
        merchantId: form.values.merchantId,
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
          <Button color="green" onClick={resetForm}>
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
              label="Select Merchant"
              description="Information about the merchant"
              placeholder="Choose Merchant"
              required
              data={merchantSelectData}
              nothingFound="No merchants"
              {...form.getInputProps('merchantId')}
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
            <NumberInput
              label="Amount"
              description="Amount for payment"
              icon="$"
              required
              min={0}
              precision={2}
              parser={(value) => value?.replace(/(,*)/g, '')}
              formatter={(value = '') =>
                !Number.isNaN(parseFloat(value))
                  ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : ''
              }
              {...form.getInputProps('amount')}
            />
            <Group mt="xl" position="right">
              {renderFormButton()}
            </Group>
          </Stack>
        </SimpleGrid>
      </form>
    </Panel>
  );
};
