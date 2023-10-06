import { Button, Group, Text } from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import { JsonModal, Panel, TableWithJsonDisplay } from 'components';
import { useGetPayment } from './hooks/useGetPayment';
import { paymentAuthorizeResponseListMock } from 'mocks/paymentAuthorizeResponseList.mock';
import { paymentResponse, transactionState } from 'generated-api-models';
import { useState } from 'react';
import { IconEye } from '@tabler/icons';
import { transactionManagementType } from 'shared.types';
import { FormModal } from './FormModal';
import { formModalType, formTypes } from './types';
import { JsxElement } from 'typescript';

export const PaymentTransactionTable = ({
  transactionIds,
}: transactionManagementType) => {
  const initialTransactions: paymentResponse[] =
    paymentAuthorizeResponseListMock;

  const [modalOpen, setModalState] = useState<boolean>(false);
  const [formModalOpen, setFormModalState] = useState<boolean>(false);

  const [formModalData, setFormModalData] = useState<formModalType>({});
  const [jsonModalValue, setJsonModalValue] = useState({});

  const transactions = useQueries({
    queries: transactionIds.map((id) => {
      return {
        queryKey: ['payments', id],
        queryFn: () => useGetPayment(id),
      };
    }),
  });

  const isLoading = transactions.some((query) => query.isLoading);

  const handleModalOpen = (rowData: paymentResponse) => {
    setJsonModalValue(rowData);
    setModalState(true);
  };

  const handleFormModalOpen = (
    rowData: paymentResponse,
    formType: formTypes,
  ) => {
    setFormModalData({
      formData: rowData,
      formType: formType,
    });
    setFormModalState(true);
  };

  const displayPaymentActions = (rowData: paymentResponse) => {
    return (
      <Group grow>
        <Button
          compact
          disabled={rowData.transactionState !== transactionState.AUTHORIZED}
          onClick={() => handleFormModalOpen(rowData, formTypes.CAPTURE)}
        >
          Capture
        </Button>
        <Button compact disabled>
          Void
        </Button>
        <Button compact disabled>
          Refund
        </Button>
      </Group>
    );
  };

  const checkIfRecentDate = (date: string) => {
    return new Date().getTime() - new Date(date).getTime() < 1 * 60 * 1000;
  };

  const createRow = (rowData: paymentResponse) => {
    const isNew =
      rowData.transactionDate && checkIfRecentDate(rowData.transactionDate);

    return (
      <tr
        key={rowData.transactionId}
        style={{ background: isNew ? '#EBFBEE' : '' }}
      >
        <td>
          <Button
            onClick={() => handleModalOpen(rowData)}
            compact
            variant="default"
          >
            <IconEye size={16} />
          </Button>
        </td>
        <td>{rowData.transactionId}</td>
        <td>{rowData.transactionDate}</td>
        <td>{rowData.transactionState}</td>
        <td>{displayPaymentActions(rowData)}</td>
      </tr>
    );
  };

  let rows: JSX.Element[] = [];
  if (!isLoading) {
    transactions.map(({ data }) => {
      data && rows.unshift(createRow(data));
    });
  }

  const ths = (
    <tr>
      <th></th>
      <th>Transaction ID</th>
      <th>Transaction Date</th>
      <th>Transaction State</th>
      <th>Actions</th>
    </tr>
  );

  return (
    <Panel
      title="List of Payment Transactions"
      apiCallType="GET"
      apiEndpoint="/payments/{id}"
    >
      <Text>You can use this call to return a specific transaction</Text>
      <FormModal
        modalOpened={formModalOpen}
        setModalOpened={setFormModalState}
        data={formModalData}
      />
      <JsonModal
        json={jsonModalValue}
        modalOpen={modalOpen}
        setModalState={setModalState}
        apiEndpoint={`/payments/{id}`}
      />
      <TableWithJsonDisplay ths={ths} rows={rows} />
    </Panel>
  );
};
