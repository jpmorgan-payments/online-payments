import { SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizeAPayment/AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';
import { transactionManagementType } from 'shared.types';

export const OnlineGoodsAndServicesPanel = (
  props: transactionManagementType,
) => {
  return (
    <SimpleGrid>
      <AuthorizePaymentForm {...props} />
      <PaymentTransactionTable {...props} />
    </SimpleGrid>
  );
};
