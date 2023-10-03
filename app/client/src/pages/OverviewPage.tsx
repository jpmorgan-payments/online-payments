import { Anchor, List, Text, Title } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';

export const OverviewPage = () => {
  return (
    <PageWrapper title="Online Payments Showcase">
      <Text>
        The Online Payments API allows you to accept web payments across a variety of regions and countries. Various payment methods are supported depending on your business and how your customers expect to pay. We will be adding more use cases so you can get an idea of how to use these flexible APIs to meet your specific business needs.
      </Text>
      <Title order={2} mt="xs">
        In this showcase
      </Title>
      <div>
        <Text>
          This showcase application demonstrates the main use cases for each
          endpoint of the Online Payments API.
        </Text>
        <Text>
          Explore this app to get a general sense of the experiences you can
          create, alongside mocked API requests and responses. You can:
        </Text>
      </div>
      <List withPadding>
        <List.Item>
          <b>Make a payment</b> - initiate a payment request for billers or eCommerce use cases, as your clients would.
        </List.Item>
        <List.Item>
          <b>Finalize a payment</b> - complete the payment once the amount has been finalized or the order is fulfilled.
        </List.Item>
        <List.Item>
          <b>Refund a payment</b> - partially or fully refund a completed payment in support of your refund policies.
        </List.Item>
        <List.Item>
          <b>Void a payment</b> - void a payment to release any authorization hold on the accountholder’s account.
        </List.Item>
      </List>
      <Text>
        You can also take a closer look at this application's code at the{' '}
        <Anchor href={GITHUB_REPO} target="_blank" color="blue">
          GitHub repository
        </Anchor>
        .
      </Text>
      <Title order={2} mt="xs">
        Authentication
      </Title>
      <Text>
        In this sample app, your requests are not sent to the live Online Payments APIs. In a live environment, a token is required in the header
        of your requests.
      </Text>
      <Title order={2} mt="xs">
        Learn more
      </Title>
      <div>
        <Text>
          Learn more about Online Payments at:{' '}
          <Anchor
            href="https://www.jpmorgan.com/payments"
            target="_blank"
            color="blue"
          >
            https://www.jpmorgan.com/payments
          </Anchor>
        </Text>
      </div>
    </PageWrapper>
  );
};
