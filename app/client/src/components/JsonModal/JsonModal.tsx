import { Badge, BoxProps, Button, Code, Group, Modal } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons';

interface JsonModalProps {
  json?: object;
  apiEndpoint?: string;
}

export const JsonModal = ({ json, apiEndpoint }: JsonModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      {json ? (
        <>
          <Modal
            opened={opened}
            onClose={close}
            size="xl"
            title={
              <Group spacing={4} align="center">
                <Badge variant="filled" color="green" radius="xs">
                  GET
                </Badge>
                <Code sx={{ backgroundColor: 'unset' }}>{apiEndpoint}</Code>
              </Group>
            }
          >
            <Prism
              language="json"
              styles={{ line: { width: 'unset' } }}
              radius={0}
            >
              {JSON.stringify(json, null, 4)}
            </Prism>
          </Modal>
          <Group position="right" mb={4}>
            <Button
              size="xs"
              compact
              leftIcon={<IconEye size={16} />}
              variant="subtle"
              color="gray"
              onClick={open}
            >
              View JSON
            </Button>
          </Group>
        </>
      ) : null}
    </>
  );
};
