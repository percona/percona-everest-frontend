// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Messages } from './restore-dialog.messages';
import { RestoreDialogProps } from './restore-dialog.types';
import { DbWizardFormFields } from '../database-form.types';

export const RestoreDialog = ({
  open,
  setOpen,
  onSubmit,
}: RestoreDialogProps) => {
  const { handleSubmit, watch } = useFormContext();
  const { state } = useLocation();
  const originalDbName = state?.selectedDbCluster;
  const restoreDbName = watch(DbWizardFormFields.dbName);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      Messages.alert(originalDbName, restoreDbName)
    );
    enqueueSnackbar(Messages.copyToClipboardTooltip, {
      variant: 'success',
    });
  };

  return (
    <Dialog open={open}>
      <DialogTitle onClose={() => setOpen(false)}>{Messages.title}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>{Messages.content}</Typography>
        <Alert
          icon={false}
          severity="info"
          action={
            navigator.clipboard &&
            window.isSecureContext && (
              <Button color="inherit" size="medium" onClick={copyToClipboard}>
                {Messages.copy}
              </Button>
            )
          }
        >
          {Messages.alert(originalDbName, restoreDbName)}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="text" onClick={() => setOpen(false)}>
          {Messages.reject}
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {Messages.accept}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
