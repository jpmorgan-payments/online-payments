import { Flex, Group, Input, NumberInput, Select, Space } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { InferType } from 'yup';
import { validationSchema } from './utils/validationSchema';
import { currency } from 'generated-api-models';
import { useState } from 'react';

export const AmountWithCurrencyInput = ({
  form,
}: {
  form: UseFormReturnType<InferType<typeof validationSchema>>;
}) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <>
      <Input.Label>Enter payment amount and currency: </Input.Label>
      <Flex gap={'sm'}>
        <Select
          data={Object.keys(currency)}
          {...form.getInputProps('currency')}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          searchable
        />
        <NumberInput
          required
          hideControls
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
      </Flex>
    </>
  );
};
