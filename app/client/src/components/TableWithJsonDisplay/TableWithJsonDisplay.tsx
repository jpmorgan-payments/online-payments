import { Box, BoxProps, ScrollArea, Skeleton, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { JsonModal } from 'components/JsonModal/JsonModal';

interface TableWithJsonDisplayProps extends BoxProps {
  ths: JSX.Element;
  rows?: JSX.Element[];
  json?: object;
  isLoading?: boolean;
  title?: string;
  apiEndpoint?: string;
}

export const TableWithJsonDisplay = ({
  children,
  ths,
  rows,
  json,
  isLoading,
  apiEndpoint,
  ...rest
}: TableWithJsonDisplayProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <JsonModal json={json} apiEndpoint={apiEndpoint} />
      <Box {...rest} style={{ position: 'relative' }}>
        <ScrollArea offsetScrollbars type="auto">
          <Table striped withColumnBorders withBorder>
            <thead>{ths}</thead>
            <tbody>
              {isLoading
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td colSpan={100}>
                          <Skeleton h={22} />
                        </td>
                      </tr>
                    ))
                : rows}
            </tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
};
