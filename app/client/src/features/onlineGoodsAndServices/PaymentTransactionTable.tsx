import { Button, Flex, Text, Anchor } from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import { JsonModal, Panel, TableWithJsonDisplay } from 'components';
import { useGetPayment } from './hooks/useGetPayment';
import { paymentResponse, transactionState } from 'generated-api-models';
import { useState } from 'react';
import { IconEye } from '@tabler/icons';
import { TransactionManagement } from 'shared.types';
import { FormModal } from './FormModal';
import { FormModalType, FormTypes } from './types';
import { ActionButton } from 'components/';

export const PaymentTransactionTable = ({
  transactionIds,
}: TransactionManagement) => {
  const [modalOpen, setModalState] = useState<boolean>(false);
  const [formModalOpen, setFormModalState] = useState<boolean>(false);

  const [formModalData, setFormModalData] = useState<FormModalType>({});
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
    formType: FormTypes,
  ) => {
    setFormModalData({
      formData: rowData,
      formType: formType,
    });
    setFormModalState(true);
  };

  const displayPaymentActions = (rowData: paymentResponse) => {
    return (
      <Flex gap="md" wrap={'wrap'}>
        <ActionButton
          disabled={rowData.transactionState !== transactionState.AUTHORIZED}
          onClick={() => handleFormModalOpen(rowData, FormTypes.CAPTURE)}
          text={FormTypes.CAPTURE}
          toolTipText={
            rowData.transactionState !== transactionState.AUTHORIZED
              ? 'Capture only available on authorized requests'
              : undefined
          }
        />
        <ActionButton
          text={FormTypes.VOID}
          disabled={
            ![transactionState.CLOSED, transactionState.COMPLETED].includes(
              rowData.transactionState,
            )
          }
          onClick={() => handleFormModalOpen(rowData, FormTypes.VOID)}
          toolTipText={
            ![transactionState.CLOSED, transactionState.COMPLETED].includes(
              rowData.transactionState,
            )
              ? 'Void only available on closed or completed requests'
              : undefined
          }
        />
        <ActionButton
          text={FormTypes.REFUND}
          disabled={
            ![transactionState.CLOSED, transactionState.COMPLETED].includes(
              rowData.transactionState,
            )
          }
          onClick={() => handleFormModalOpen(rowData, FormTypes.REFUND)}
          toolTipText={
            ![transactionState.CLOSED, transactionState.COMPLETED].includes(
              rowData.transactionState,
            )
              ? 'Refund only available on closed or completed requests'
              : undefined
          }
        />
      </Flex>
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
      <Text c="dimmed" fs="italic">
        This is a list of all the Payments that have been created recently. We
        have prepopulated the table with some mocked data. To gather a list of
        your payments you will need to make an API call for each payment. Check
        out the API specification to find out more{' '}
        <Anchor href="https://www.jpmorgan.com/payments" target="_blank">
          here.
        </Anchor>
      </Text>
      <br />
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
