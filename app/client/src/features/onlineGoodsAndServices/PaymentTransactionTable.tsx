import { Text } from '@mantine/core';
import { Panel, TableWithJsonDisplay } from 'components';

export const PaymentTransactionTable = () => {
  const ths = (
    <tr>
      <th>Label</th>
      <th>Account Number</th>
      <th>State</th>
    </tr>
  );

  return (
    <Panel title="List of Accounts" apiCallType="GET" apiEndpoint="/accounts">
      <Text>
        You can use this call to return a list of all accounts for a user.
      </Text>
      <Text>
        The response does not contain any balance information for any of the
        returned accounts.
      </Text>
      <TableWithJsonDisplay ths={ths} apiEndpoint="/accounts" json={{}} />
    </Panel>
  );
};
