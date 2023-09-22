import { Badge, Button, Code, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';
import { IconEye } from '@tabler/icons';

interface JsonModalProps {
  json?: object;
  apiEndpoint?: string;
  modalOpen: boolean;
  setModalState: (state: boolean) => void;
}

export const JsonModal = ({
  json,
  apiEndpoint,
  modalOpen,
  setModalState,
}: JsonModalProps) => {
  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={() => setModalState(false)}
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
        <Prism language="json" styles={{ line: { width: 'unset' } }} radius={0}>
          {JSON.stringify(json, null, 4)}
        </Prism>
      </Modal>
    </>
  );
};
