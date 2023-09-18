import { Grid, SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';
import { useState } from 'react';
import { usePaymentResponse } from './hooks/usePaymentResponse';
import type { paymentResponse } from 'generated-api-models';

export const OnlineGoodsAndServicesPanel = () => {
  const mockedTransactionData = usePaymentResponse();

  const [transactionData, setTransactionData] = useState(mockedTransactionData);

  const addNewTransaction = (newTransaction: paymentResponse) => {
    setTransactionData([newTransaction, ...transactionData]);
  };
  return (
    <SimpleGrid>
      <AuthorizePaymentForm addNewTransaction={addNewTransaction} />
      <PaymentTransactionTable transactionData={transactionData} />
    </SimpleGrid>
  );
};
