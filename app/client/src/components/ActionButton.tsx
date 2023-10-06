import { Button, Tooltip } from '@mantine/core';

type ActionButtonProps = {
  disabled: boolean;
  onClick?: () => void;
  text: string;
  toolTipText?: string;
};
export const ActionButton = ({
  disabled,
  onClick,
  text,
  toolTipText,
}: ActionButtonProps) => {
  if (toolTipText) {
    return (
      <Tooltip label={toolTipText}>
        <span>
          <Button compact disabled={disabled} onClick={onClick}>
            {text}
          </Button>
        </span>
      </Tooltip>
    );
  } else {
    return (
      <Button compact disabled={disabled} onClick={onClick}>
        {text}
      </Button>
    );
  }
};
