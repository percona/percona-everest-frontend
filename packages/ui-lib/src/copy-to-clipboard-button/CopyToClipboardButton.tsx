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

  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title="Copied to clipboard!"
    >
      <IconButton sx={buttonSx} onClick={handleClick}>
        <ContentCopyOutlinedIcon sx={iconSx} />
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
