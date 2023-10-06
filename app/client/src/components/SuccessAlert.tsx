import { Alert, Button, Space, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

type SuccessAlertProps = {
  resetForm: () => void;
  buttonText: string;
  title: string;
  successText: string;
};

export const SuccessAlert = ({
  resetForm,
  buttonText,
  title,
  successText,
}: SuccessAlertProps) => (
  <Alert
    icon={<IconAlertCircle size="1rem" />}
    title={<Text fz="lg">{title}</Text>}
    color="green"
  >
    <Text fz="md">{successText}</Text>
    <Space h="md" />
    <Button onClick={resetForm}>{buttonText}</Button>
  </Alert>
);
