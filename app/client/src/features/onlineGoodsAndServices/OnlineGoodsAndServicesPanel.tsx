import { SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizeAPayment/AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';
import { TransactionManagement } from 'shared.types';

export const OnlineGoodsAndServicesPanel = (props: TransactionManagement) => {
  return (
    <SimpleGrid>
      <AuthorizePaymentForm {...props} />
      <PaymentTransactionTable {...props} />
    </SimpleGrid>
  );
};
