import { SimpleGrid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizeAPayment/AuthorizePaymentForm';
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
      newTransaction,
      ...prevTransactionData,
    ]);
  };
  return (
    <SimpleGrid>
      <AuthorizePaymentForm addNewTransaction={addNewTransaction} />
      <PaymentTransactionTable transactionData={transactionData} />
    </SimpleGrid>
  );
};
