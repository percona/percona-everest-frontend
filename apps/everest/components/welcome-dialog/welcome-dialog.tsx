import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import React from 'react';

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
        <Typography variant="h5">Welcome to Everest Alpha!</Typography>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexFlow: 'column' }}>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
          We're thrilled to welcome you to the Everest Alpha testing group! The
          Alpha version is intended for testing before the launch of the first
          public version in September. During this Alpha phase, we will be
          fine-tuning the functionality based on feedback we receive from you
          via this notion page.
        </Typography>
        <Divider />
        <Typography variant="subHead1" sx={{ p: '24px 44px 8px 44px' }}>
          Ready to get started?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            px: '44px',
          }}
        >
          <Card
            sx={{
              width: '413.5px',
              height: '188px',
              boxShadow: 3,
            }}
          >
            <CardContent sx={{ padding: '24px 32px 24px 32px' }}>
              <AddCircleOutlineOutlinedIcon
                fontSize="inherit"
                sx={{ fontSize: '58px', stroke: '#ffffff', strokeWidth: 1 }}
              />
              <Typography gutterBottom variant="h6" component="div">
                Create database
              </Typography>
              <Typography variant="helperText" color="text.secondary">
                Define the structure, set access controls, and start organizing
                your information efficiently.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: '413.5px',
              height: '188px',
              boxShadow: 3,
            }}
          >
            <CardContent
              sx={{ padding: '24px 32px 24px 32px', fontWeight: 400 }}
            >
              <SettingsOutlinedIcon
                fontSize="inherit"
                sx={{ fontSize: '58px', stroke: '#ffffff', strokeWidth: 1 }}
              />
              <Typography gutterBottom variant="h6" component="div">
                Set default configurations
              </Typography>
              <Typography variant="helperText" color="text.secondary">
                Customize settings and ensure that your database operates
                optimally from the get-go.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
