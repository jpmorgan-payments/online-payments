import { SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizeAPayment/AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';
import { useState } from 'react';

export const OnlineGoodsAndServicesPanel = () => {
  const [transactionIds, setTransactionIds] = useState<string[]>([]);
  return (
    <SimpleGrid>
      <AuthorizePaymentForm
        transactionIds={transactionIds}
        setTransactionIds={setTransactionIds}
      />
      <PaymentTransactionTable transactionIds={transactionIds} />
    </SimpleGrid>
  );
};
