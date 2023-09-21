import { Text } from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import { Panel, TableWithJsonDisplay } from 'components';
import { useGetPayment } from './hooks/useGetPayment';
import { paymentAuthorizeResponseListMock } from 'mocks/paymentAuthorizeResponseList.mock';
import { paymentResponse } from 'generated-api-models';

export const PaymentTransactionTable = ({
  transactionIds,
}: {
  transactionIds: string[];
}) => {
  const initialTransactions: paymentResponse[] =
    paymentAuthorizeResponseListMock;

  const transactions = useQueries({
    queries: transactionIds.map((id) => {
      return {
        queryKey: ['payments', id],
        queryFn: () => useGetPayment(id),
      };
    }),
  });

  const isLoading = transactions.some((query) => query.isLoading);

  const createRow = (rowData: paymentResponse) => (
    <tr key={rowData.transactionId} onClick={() => console.log('hello')}>
      <td>{rowData.transactionId}</td>
      <td>{rowData.requestId}</td>
      <td>{rowData.transactionDate}</td>
      <td>{rowData.transactionState}</td>
      <td>{rowData.amount}</td>
    </tr>
  );

  const rows = initialTransactions.map((transaction) => createRow(transaction));

  if (!isLoading) {
    transactions.map(({ data }) => {
      data && rows.push(createRow(data));
    });
  }

  const ths = (
    <tr>
      <th>Transaction ID</th>
      <th>Request ID</th>
      <th>Transaction State</th>
      <th>Amount</th>
    </tr>
  );

  return (
    <Panel
      title="List of Payment Transactions"
      apiCallType="GET"
      apiEndpoint="/payments/{id}"
    >
      <Text>You can use this call to return a specific transaction</Text>
      <TableWithJsonDisplay
        ths={ths}
        apiEndpoint="/payments/{id}"
        rows={rows}
      />
    </Panel>
  );
};
