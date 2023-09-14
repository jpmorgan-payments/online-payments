import { Container, SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';

export const OnlineGoodsAndServicesPanel = () => {
  return (
    <Container>
      <SimpleGrid cols={2} spacing="md">
        <AuthorizePaymentForm />
        <PaymentTransactionTable />
      </SimpleGrid>
    </Container>
  );
};
