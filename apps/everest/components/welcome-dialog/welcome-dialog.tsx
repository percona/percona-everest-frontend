import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Link,
  Typography,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Messages } from './welcome-dialog.messages';
export const WelcomeDialog = ({
  open,
  closeDialog,
}: {
  open: boolean;
  closeDialog: () => void;
}) => {
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate('/');
    closeDialog();
  };

  return (
    <Dialog
      PaperProps={{ sx: { minWidth: '800px' } }}
      open={open}
      onClose={closeDialog}
    >
      <DialogTitle onClose={closeDialog}>
        <Typography variant="h5">{Messages.header}</Typography>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexFlow: 'column' }}>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
          {Messages.subHead}
          <Link href="https://www.notion.so/percona/d67b6dd6afa04a149ab8685c609dbda8?v=ee3ab0c7c4d5490aa57552eb506da3bb">
            {Messages.notionPage}
          </Link>
          .
        </Typography>
        {/* TODO: uncomment when default settings page is ready */}
        {/* <Divider />
        <Typography variant="subHead1" sx={{ p: '24px 44px 8px 44px' }}>
          {Messages.subHead2}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            px: '44px',
          }}
        >

          <CardLink
            Icon={AddCircleOutlineOutlinedIcon}
            action={Messages.card1.header}
            description={Messages.card1.description}
            link="/databases/new"
            handleCloseModal={closeDialog}
          />
          <CardLink
            Icon={SettingsOutlinedIcon}
            action={Messages.card2.header}
            description={Messages.card2.description}
            link="/settings"
            handleCloseModal={closeDialog}
          />
        </Box> */}
      </DialogContent>
      {/* TODO: remove dialog actions when cards are uncommented */}
      <DialogActions>
        <Button onClick={handleRedirectHome} variant="contained" size="large">
          {Messages.letsGo}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
