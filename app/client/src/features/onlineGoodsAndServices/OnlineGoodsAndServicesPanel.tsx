import { SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';
import { useState } from 'react';
import type { paymentResponse } from 'generated-api-models';
import { paymentAuthorizeResponseListMock } from 'mocks/paymentAuthorizeResponseList.mock';

export const OnlineGoodsAndServicesPanel = () => {
  const [transactionData, setTransactionData] = useState<paymentResponse[]>(
    paymentAuthorizeResponseListMock,
  );

  const addNewTransaction = (newTransaction: paymentResponse) => {
    setTransactionData((prevTransactionData) => [
      ...prevTransactionData,
      newTransaction,
    ]);
  };
  return (
    <SimpleGrid>
      <AuthorizePaymentForm addNewTransaction={addNewTransaction} />
      <PaymentTransactionTable transactionData={transactionData} />
    </SimpleGrid>
  );
};
