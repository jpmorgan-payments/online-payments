import { useForm } from '@mantine/form';
import { captureMethod, paymentResponse } from 'generated-api-models';
import { NumberInput, Select } from '@mantine/core';

export const CaptureAPaymentForm = ({ data }: { data: paymentResponse }) => {
  const form = useForm({
    initialValues: {
      amount: data.amount,
      captureMethod: data.captureMethod,
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Select
        data={Object.keys(captureMethod)}
        label="Select Capture Method"
        {...form.getInputProps('captureMethod')}
        withAsterisk
      />
      {form.values.captureMethod === captureMethod.NOW && (
        <NumberInput hideControls min={0} {...form.getInputProps('amount')} />
      )}
    </form>
  );
};
