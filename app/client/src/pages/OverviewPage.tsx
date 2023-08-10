import { Anchor, List, Text, Title } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';

export const OverviewPage = () => {
  return (
    <PageWrapper title="Online Payments Showcase">
      <Text>
        Online Payments gives you ....
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
          <b>Make a payments</b> - make payments and add recipients, as your clients
          would.
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
