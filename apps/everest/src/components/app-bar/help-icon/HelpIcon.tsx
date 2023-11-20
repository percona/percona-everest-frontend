import { useState } from 'react';
import {
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useVersion } from 'hooks/api/version/useVersion';

const AppBarHelpIcon = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: versionData } = useVersion();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="medium"
        aria-label="help"
        aria-controls="menu-help"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ color: 'text.secondary' }}
        data-testid="help-appbar-button"
      >
        <HelpIcon />
      </IconButton>
      <Menu
        id="menu-help"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem sx={{ cursor: 'text', userSelect: 'text' }}>
          <Typography variant="helperText" color="text.secondary">
            {`Everest v${versionData?.version}`}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Typography variant="menuText">
            <Link
              underline="none"
              color="inherit"
              target="_blank"
              rel="noopener"
              href="https://docs.percona.com/everest/"
            >
              Documentation
            </Link>
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppBarHelpIcon;
