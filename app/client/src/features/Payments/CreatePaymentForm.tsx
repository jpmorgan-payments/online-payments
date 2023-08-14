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
import { useAccountHolder } from './hooks';
import { paymentInstrument } from './utils/models';

export const CreatePaymentForm = () => {
  // Initialize the form using the default values defined in validationSchema
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const merchantData = useMerchants();
  const paymentMethodData = usePaymentMethod();
  const accountHolderData = useAccountHolder();

  const merchantSelectData = merchantData?.map((merchant, index) => {
    return {
      key: index,
      value: merchant.merchantId + '',
      label:
        merchant.merchantId + ' - ' + merchant.merchantSoftware.companyName,
    };
  });

  const accountHolderSelectData = accountHolderData?.map((accountHolder, index) => {
    return {
      key: index,
      value: JSON.stringify(accountHolder),
      label:
      accountHolder.referenceId + ' - ' + accountHolder.fullName,
    };
  });

  const paymentMethodSelectData = paymentMethodData?.map(
    (paymentMethod, index) => {
      return {
        key: index,
        value: JSON.stringify(paymentMethod),
        label:
        paymentMethod.card ? paymentMethod.card.accountNumber.replace(/\d(?=\d{4})/g, '*') : '',
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


  const onSubmit = () => null;

  const paymentRequest = useMemo(
    () =>
      convertToPaymentRequest(
        form.values,
        paymentInstrument[form.values.paymentInstrument as keyof typeof paymentInstrument],
        selectedMerchant
      ),
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
            label="Select Payment Instrument"
            description="Payment Instrument"
            placeholder="Choose Payment Instrument"
            required
            data={Object.values(paymentInstrument)}
            defaultValue={paymentInstrument['Approved Auth Basic']}
            {...form.getInputProps('paymentInstrument')}
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
            {...form.getInputProps('paymentMethod')}
          />
          {form.values.paymentInstrument === paymentInstrument['Approved Auth CIT Onetime Stored'] && (
            <Select
              label="Select Account Holder"
              description="Card owner properties"
              placeholder="Choose Account Holder"
              required
              data={accountHolderSelectData}
              nothingFound="No account holders"
              {...form.getInputProps('referenceId')}
            />
          )}
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
