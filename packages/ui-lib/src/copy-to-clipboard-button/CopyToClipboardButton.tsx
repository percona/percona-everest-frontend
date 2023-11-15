import { useState } from 'react';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { CopyToClipboardButtonProps } from './CopyToClipboardButton.types';

const CopyToClipboardButton = ({
  textToCopy,
  buttonSx,
  iconSx,
}: CopyToClipboardButtonProps) => {
  const [open, setOpen] = useState(false);
  const clipboardAvailable = !!navigator.clipboard;

  const handleClick = () => {
    if (clipboardAvailable) {
      navigator.clipboard.writeText(textToCopy);
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    }
  };

  return (
    <Tooltip
      {...(clipboardAvailable && {
        disableHoverListener: true,
        open,
      })}
      disableFocusListener
      disableTouchListener
      PopperProps={{
        disablePortal: true,
      }}
      title={
        clipboardAvailable
          ? 'Copied to clipboard!'
          : 'Copy action not available'
      }
    >
      <IconButton
        component="div"
        sx={{
          ...buttonSx,
          '&.Mui-disabled': {
            pointerEvents: 'auto',
          },
        }}
        onClick={handleClick}
        disabled={!clipboardAvailable}
      >
        <ContentCopyOutlinedIcon sx={iconSx} />
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
