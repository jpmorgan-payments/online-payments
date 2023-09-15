import { Grid, SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';

export const OnlineGoodsAndServicesPanel = () => {
  return (
    <SimpleGrid>
      <AuthorizePaymentForm />
      <PaymentTransactionTable />
    </SimpleGrid>
  );
};
