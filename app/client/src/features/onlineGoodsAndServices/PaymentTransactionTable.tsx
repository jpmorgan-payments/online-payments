import { Button, Flex, Text, Anchor, useMantineTheme, Table } from '@mantine/core';
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
import { PAYMENTS_GET_TRANSACTION_API } from 'data/constants';

export const PaymentTransactionTable = ({
  transactionIds,
}: TransactionManagement) => {
  const theme = useMantineTheme();

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

    const isVoidAvailable = [transactionState.CLOSED, transactionState.COMPLETED].includes(
      rowData.transactionState,
    ) && !rowData.isVoid;

    const isRefundAvailable = ([transactionState.CLOSED, transactionState.COMPLETED].includes(
      rowData.transactionState,
    ) &&  (rowData.remainingRefundableAmount && rowData.remainingRefundableAmount > 0));

    const isCaptureAvailable = rowData.transactionState === transactionState.AUTHORIZED || (rowData.remainingAuthAmount && rowData.remainingAuthAmount > 0);
    return (
      <Flex gap="md" wrap={'wrap'}>
        <ActionButton
          disabled={!isCaptureAvailable}
          onClick={() => handleFormModalOpen(rowData, FormTypes.CAPTURE)}
          text={FormTypes.CAPTURE}
          toolTipText={
            !isCaptureAvailable
              ? 'Capture only available on authorized requests with `remainingAuthAmount` greater than zero'
              : undefined
          }
        />
        <ActionButton
          text={FormTypes.VOID}
          disabled={!isVoidAvailable}
          onClick={() => handleFormModalOpen(rowData, FormTypes.VOID)}
          toolTipText={
            !isVoidAvailable
              ? 'Void action is only available on closed/completed requests that haven`t been void previously'
              : undefined
          }
        />
        <ActionButton
          text={FormTypes.REFUND}
          disabled={!isRefundAvailable}
          onClick={() => handleFormModalOpen(rowData, FormTypes.REFUND)}
          toolTipText={
            !isRefundAvailable
              ? 'Refund only available on closed/completed requests that haven`t been fully refunded previously'
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
        style={{ background: isNew ? theme.colors.green[0] : '' }}
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
        <Anchor href={PAYMENTS_GET_TRANSACTION_API} target="_blank">
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
