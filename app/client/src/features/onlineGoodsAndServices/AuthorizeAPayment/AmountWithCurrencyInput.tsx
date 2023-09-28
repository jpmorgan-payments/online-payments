import { Group, Input, NumberInput, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { InferType } from 'yup';
import { validationSchema } from './utils/validationSchema';
import { currency } from 'generated-api-models';

export const AmountWithCurrencyInput = ({
  form,
}: {
  form: UseFormReturnType<InferType<typeof validationSchema>>;
}) => {
  return (
    <Group spacing={0}>
      <Input.Label>Amount</Input.Label>
      <Select
        data={Object.keys(currency)}
        {...form.getInputProps('currency')}
      />
      <NumberInput
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
    </Group>
  );
};
