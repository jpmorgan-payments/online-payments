import { useEffect, useRef, useState } from 'react';
import { Stepper, Button, Group, TextInput, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PaymentInstrument } from './models';
import { PaymentInstrumentForm } from './PaymentInstrumentForm';

export const CreatePaymentWizard = () => {
  const [active, setActive] = useState(0);
  const [formStarted, setFormStarted] = useState<boolean>(false);
  const [paymentInstrument, setPaymentInstrument] = useState<PaymentInstrument>(PaymentInstrument['Approved Auth Basic']);

  const nextStep = () =>
    setActive((current) => {
      return current < 2 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // Scroll to top of wizard when user moves through it
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panelRef.current?.scrollIntoView();
  }, [active]);

  const form = useForm({
    initialValues: {
      paymentInstrument: undefined
  }});

  const paymentInstrumentFormSubmit = () => {
    form.reset();
    setFormStarted(true);
    switch(paymentInstrument){
      case PaymentInstrument['Approved Auth CIT Onetime Stored']:
        console.log('Approved Auth CIT Onetime Stored')
        return;
      case PaymentInstrument['Approved Auth MIT Subsequent Stored']:
        console.log('Approved Auth MIT Subsequent Stored');
        return;
      default:
        console.log('default')
        console.log(paymentInstrument);
        return;
    }      
  };
    
  return (
      <>
    {!formStarted && (
      <PaymentInstrumentForm onSelect={setPaymentInstrument} onSubmit={paymentInstrumentFormSubmit}/>
    )}
    {formStarted && 
    <>
      <Stepper active={active} breakpoint="sm">

        <Stepper.Step label="Second step" description="Personal information">
          <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
          <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
      </>
    }
    </>
  );
}