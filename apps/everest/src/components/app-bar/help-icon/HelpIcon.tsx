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

const AppBarHelpIcon = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        <MenuItem>
          <Typography variant="helperText" color="text.secondary">
            Everest v0.5
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
