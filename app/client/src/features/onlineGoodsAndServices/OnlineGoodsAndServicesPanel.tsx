import { Grid } from '@mantine/core';
import { AuthorizePaymentForm } from './AuthorizePaymentForm';
import { PaymentTransactionTable } from './PaymentTransactionTable';

export const OnlineGoodsAndServicesPanel = () => {
  return (
    <Grid>
      <Grid.Col span={4}>
        <AuthorizePaymentForm />
      </Grid.Col>
      <Grid.Col span={'auto'}>
        <PaymentTransactionTable />
      </Grid.Col>
    </Grid>
  );
};
