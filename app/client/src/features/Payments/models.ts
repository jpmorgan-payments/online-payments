export enum PaymentInstrument {'Approved Auth Basic', 'Approved Auth CIT Onetime Stored' , 'Approved Auth MIT Subsequent Stored'};
import type { TablerIcon } from '@tabler/icons';
import type { AnySchema } from 'yup';
import type { UseFormReturnType } from '@mantine/form';

 export interface Step {
    ({
      form,
      paymentInstrument,
    }: {
      form: UseFormReturnType<OnboardingValues>;
      paymentInstrument: PaymentInstrument;
    }): JSX.Element;
    label?: string;
    description?: string;
    Icon?: TablerIcon;
    initialValues?: Record<string, any>;
    validationSchema?: AnySchema;
    nextLabel?: string;
  }