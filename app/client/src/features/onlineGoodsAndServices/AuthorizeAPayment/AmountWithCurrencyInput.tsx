import { Flex, Input, NumberInput, Select } from '@mantine/core';
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
          aria-label="currency selection"
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          searchable
        />
        <NumberInput
          required
          hideControls
          aria-label="Amount to be sent"
          min={0}
          {...form.getInputProps('amount')}
        />
      </Flex>
    </>
  );
};
