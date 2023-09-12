import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import React from 'react';
import { CardLink } from './card/CardLink';
import { Messages } from './welcome-dialog.messages';
export const WelcomeDialog = ({
  open,
  closeDialog,
}: {
  open: boolean;
  closeDialog: () => void;
}) => {
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
        <Divider />
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
          {/* TODO: uncomment when default settings page is ready */}
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
        </Box>
      </DialogContent>
    </Dialog>
  );
};
