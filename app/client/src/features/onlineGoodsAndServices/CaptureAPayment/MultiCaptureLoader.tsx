import { Loader, Text, Stack } from '@mantine/core';

export const MultiCaptureLoader = ({
  requestCount,
}: {
  requestCount: number;
}) => (
  <Stack align="center">
    <Loader />
    <Text>
      Submitting {requestCount} capture requests.... <br />
      You can check network logs to see each submitted request.
    </Text>
  </Stack>
);
