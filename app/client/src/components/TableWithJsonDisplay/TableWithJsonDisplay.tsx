import { Box, BoxProps, ScrollArea, Skeleton, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { JsonModal } from 'components/JsonModal/JsonModal';

interface TableWithJsonDisplayProps extends BoxProps {
  ths: JSX.Element;
  rows?: JSX.Element[];
  isLoading?: boolean;
}

export const TableWithJsonDisplay = ({
  ths,
  rows,
  isLoading,
}: TableWithJsonDisplayProps) => {
  return (
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
  );
};
