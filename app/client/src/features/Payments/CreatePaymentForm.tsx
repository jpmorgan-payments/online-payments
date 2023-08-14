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

import { ValuesTable, Panel } from 'components';
import { validationSchema } from './utils/validationSchema';

import { transactionCreateResponseMock } from 'mocks';
import { convertToPaymentRequest } from './utils/convertToPaymentRequest';


const PAYMENT_INSTRUMENTS = ['Approved Auth Basic']
//, 'Approved Auth MIT Subsequent Stored', ' Approved Auth CIT Onetime Stored']
export const CreatePaymentForm = () => {
  // Initialize the form using the default values defined in validationSchema
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const onSubmit = () => null;

  const paymentRequest = useMemo(
    () => convertToPaymentRequest(form.values, undefined, undefined),
    [form.values],
  );


  return (
    <Panel
      title="Create a Payment"
      apiCallType="POST"
      apiEndpoint="/payments"
      requestBody={paymentRequest}
      responseBody={transactionCreateResponseMock}
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