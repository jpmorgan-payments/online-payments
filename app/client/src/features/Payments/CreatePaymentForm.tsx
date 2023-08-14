import { useMemo } from 'react';
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { Panel } from 'components';
import { validationSchema } from './utils/validationSchema';

import { convertToPaymentRequest } from './utils/convertToPaymentRequest';
import { useMerchants } from './hooks/useMerchants';
import { usePaymentMethod } from './hooks/usePaymentMethod';
import { paymentCreateResponseMock } from 'mocks/paymentCreateResponse.mock';

const PAYMENT_INSTRUMENTS = ['Approved Auth Basic'];
//, 'Approved Auth MIT Subsequent Stored', ' Approved Auth CIT Onetime Stored']
export const CreatePaymentForm = () => {
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

  const paymentMethodSelectData = paymentMethodData?.map((paymentMethod, index) => {
    if(paymentMethod.card){
      return {
        key: index,
        value: paymentMethod.card.accountNumber,
        label: paymentMethod.card.accountNumber.replace(
          /\d(?=\d{4})/g,
          '*',
        )
      };
    }
    return {
      key: index,
      value: '',
      label: ''
    }
  });

  const selectedMerchant = useMemo(
    () =>
      merchantData.find(
        (merchant) => merchant.merchantId=== form.values.merchantId,
      ),
    [form.values.merchantId, merchantData],
  );

  const selectedPaymentMethod = useMemo(
    () =>
    paymentMethodData.find(
        (paymentMethod) => paymentMethod.card?.accountNumber === form.values.paymentId,
      ),
    [form.values.paymentId, merchantData],
  );

  const onSubmit = () => null;

  const paymentRequest = useMemo(
    () => convertToPaymentRequest(form.values, selectedMerchant, selectedPaymentMethod),
    [form.values],
  );

  return (
    <Panel
      title="Create a Payment"
      apiCallType="POST"
      apiEndpoint="/payments"
      requestBody={paymentRequest}
      responseBody={paymentCreateResponseMock}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 'md', cols: 2 },
            { minWidth: 'lg', cols: 1 },
            { minWidth: 'xl', cols: 2 },
          ]}
        >
          <Select
            label="Select Payment Method"
            description="Payment Method"
            placeholder="Choose Payment Method"
            required
            data={PAYMENT_INSTRUMENTS}
            defaultValue={PAYMENT_INSTRUMENTS[0]}
            {...form.getInputProps('paymentMethod')}
          />
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
            {...form.getInputProps('paymentId')}
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
        </SimpleGrid>
        <Group mt="xl" position="right">
          <Button type="submit">Review & Submit</Button>
        </Group>
      </form>
    </Panel>
  );
};
