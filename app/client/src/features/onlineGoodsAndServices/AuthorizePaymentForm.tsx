import { useMemo } from 'react';
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
import { useMerchants } from './hooks/useMerchants';
import { usePaymentMethod } from './hooks/usePaymentMethod';
import { paymentAuthorizeResponseMock } from 'mocks/paymentAuthorizeResponse.mock';
import { convertToPaymentRequest } from './utils/convertToPaymentRequest';
import type { paymentResponse } from 'generated-api-models';
export const AuthorizePaymentForm = ({
  addNewTransaction,
}: {
  addNewTransaction: (data: paymentResponse) => void;
}) => {
  // Initialize the form using the default values defined in validationSchema
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const merchantData = useMerchants();
  const paymentMethodData = usePaymentMethod();

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

  const onSubmit = () => {
    addNewTransaction(paymentAuthorizeResponseMock[0]);
  };

  return (
    <Panel
      title="Authorize a Payment"
      apiCallType="POST"
      apiEndpoint="/payments"
      requestBody={paymentRequest}
      responseBody={paymentAuthorizeResponseMock}
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
              <Button type="submit">Review & Submit</Button>
            </Group>
          </Stack>
        </SimpleGrid>
      </form>
    </Panel>
  );
};
