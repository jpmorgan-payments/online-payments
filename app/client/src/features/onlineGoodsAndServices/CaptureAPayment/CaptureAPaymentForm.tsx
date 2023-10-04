import { useForm } from '@mantine/form';
import { paymentResponse } from 'generated-api-models';
import { NumberInput } from '@mantine/core';

export const CaptureAPaymentForm = ({ data }: { data: paymentResponse }) => {
  const form = useForm({
    initialValues: {
      amount: data.amount,
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
  };
  return (
    <form onSubmit={handleSubmit}>
      <NumberInput
        required
        hideControls
        min={0}
        {...form.getInputProps('amount')}
      />
    </form>
  );
};
