import { Panel } from 'components';
import { useForm } from '@mantine/form';
import { captureMethod, paymentResponse } from 'generated-api-models';
import { NumberInput, Select, Group, Button } from '@mantine/core';
import { captureRequestFullMock } from 'mocks/captures/captureRequest.mock';
import { useState } from 'react';

export const CaptureAPaymentPanel = ({ data }: { data: paymentResponse }) => {
  const form = useForm({
    initialValues: {
      amount: data.amount,
      captureMethod: data.captureMethod,
    },
  });

  let requestBody = captureRequestFullMock;

  const handleSubmit = () => {
    console.log(form.values);
  };

  return (
    <Panel
      title="Capture a Payment"
      apiCallType="POST"
      apiEndpoint="/payments/{id}/captures"
      requestBody={requestBody}
    >
      <form onSubmit={handleSubmit}>
        <Select
          data={Object.keys(captureMethod)}
          label="Capture Method"
          {...form.getInputProps('captureMethod')}
          withAsterisk
          readOnly
        />
        {data.captureMethod === captureMethod.NOW && (
          <NumberInput hideControls min={0} {...form.getInputProps('amount')} />
        )}

        <Group mt="xl" position="right">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Panel>
  );
};
