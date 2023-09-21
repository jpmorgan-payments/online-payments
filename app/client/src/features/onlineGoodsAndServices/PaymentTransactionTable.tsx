import { Text } from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import { Panel, TableWithJsonDisplay } from 'components';
import { useGetPayment } from './hooks/useGetPayment';

export const PaymentTransactionTable = ({
  transactionIds,
}: {
  transactionIds: string[];
}) => {
  let rows = undefined;

  const transactions = useQueries({
    queries: transactionIds.map((id) => {
      return {
        queryKey: ['payments', id],
        queryFn: () => useGetPayment(id),
      };
    }),
  });

  const isLoading = transactions.some((query) => query.isLoading);

  if (!isLoading) {
    rows = transactions.map(({ data }) => (
      <tr key={data?.transactionId}>
        <td>{data?.transactionId}</td>
        <td>{data?.requestId}</td>
        <td>{data?.transactionDate}</td>
        <td>{data?.transactionState}</td>
        <td>{data?.amount}</td>
      </tr>
    ));
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
