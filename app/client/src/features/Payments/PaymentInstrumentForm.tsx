import type { FormEvent } from 'react';
import * as yup from 'yup';
import {
  Title,
  Text,
  SimpleGrid,
  Box,
  Radio,
  Button,
  Group,
  Stack,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { PaymentInstrument } from './models';

export type PaymentInstrumentFormValues = {
  paymentInstrument: PaymentInstrument;
  mockEnabled: boolean;
};

const validationSchema = yup.object({
  paymentInstrument: yup
    .mixed()
    .oneOf(Object.values(PaymentInstrument), 'Please select a instrument type'),
  mockEnabled: yup.boolean(),
});

const CustomRadioLabel = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div>
    <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
      {title}
    </Text>
    {description &&
        <Text size="sm" color="dimmed">
        {description}
        </Text>
    }
  </div>
);

type PaymentInstrumentFormProps = {
  onSelect: (paymentInstrument: PaymentInstrument) => void;
  onSubmit: (values: PaymentInstrumentFormValues, event: FormEvent<Element>) => void;
};

export const PaymentInstrumentForm = ({ onSelect, onSubmit }: PaymentInstrumentFormProps) => {
  const paymentInstrumentForm = useForm<PaymentInstrumentFormValues>({
    initialValues: {
      paymentInstrument: PaymentInstrument['Approved Auth Basic'],
      mockEnabled: false,
    },
    validate: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={paymentInstrumentForm.onSubmit(onSubmit)}>
      <section>
        <Title order={2} mb="sm">
          What kind of payment instrument do you want to use?
        </Title>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
          <Box>
            <Radio.Group
              label="Please select a payment instrument"
              required
              {...paymentInstrumentForm.getInputProps('paymentInstrument')}
              onChange={(paymentInstrument: string) => {
                paymentInstrumentForm.getInputProps('paymentInstrument').onChange(paymentInstrument);
                onSelect(PaymentInstrument[paymentInstrument as keyof typeof PaymentInstrument]);
              }}
            >
              <Stack spacing="sm" mt="sm">
                {Object.values(PaymentInstrument).filter(value => typeof value === 'string').map(instrument =>
                <Radio
                  value={instrument}
                  key={instrument}
                  label={
                    <CustomRadioLabel
                      title={instrument.toString()}
                    />
                  }
                />
                )}
              </Stack>
            </Radio.Group>
          </Box>
        </SimpleGrid>
        <Group position="apart" mt="xl">
          <Button
            ml="auto"
            type="submit"
            disabled={!paymentInstrumentForm.values.paymentInstrument}
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                width: '100%',
              },
            })}
          >
            Get started!
          </Button>
        </Group>
      </section>
    </form>
  );
};