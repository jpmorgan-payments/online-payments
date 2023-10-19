import { Badge, Anchor, Text } from '@mantine/core';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { GITHUB_REPO, ONLINE_PAYMENTS_DOC_HOME } from 'data/constants';
import { OnlineGoodsAndServicesPanel } from 'features/onlineGoodsAndServices';
import { TransactionManagement } from 'shared.types';

export const OnlineGoodsAndServicesPage = (props: TransactionManagement) => {
  return (
    <PageWrapper
      title="Online Goods and Services"
      apiEndpoint="/payments"
      githubLink={`${GITHUB_REPO}/tree/main/app/client/src/features/Payments`}
    >
      <Text>
        This is our Online Goods and Services section of our application. These
        are flows you may wish to use when handling payments for any
        goods/services purchased online. Within this page you can Authorize a
        Payment, Capture a Payment and Refund a Payment. You can check out
        further documentation on this API{' '}
        <Anchor href={ONLINE_PAYMENTS_DOC_HOME} target="_blank">
          here.
        </Anchor>
      </Text>
      <OnlineGoodsAndServicesPanel {...props} />
    </PageWrapper>
  );
};
