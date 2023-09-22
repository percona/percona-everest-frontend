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

import React from 'react';
import { Alert, Button, useMediaQuery, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Messages } from './code-copy-block.messages';
import { CodeCopyBlockProps } from './code-copy-block.types';

export const CodeCopyBlock = ({
  message,
  snackbarSuccessMessage,
}: CodeCopyBlockProps) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message);
    enqueueSnackbar(
      snackbarSuccessMessage || Messages.copyToClipboardTooltip,
      {
        variant: 'success',
      }
    );
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Alert
      severity="info"
      icon={false}
      action={
        navigator.clipboard &&
        window.isSecureContext && (
          <Button
            color="inherit"
            size="small"
            onClick={copyToClipboard}
            sx={{
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: 1,
              fontWeight: 600,
            }}
          >
            <ContentCopyIcon /> {!isMobile && Messages.copyCommand}
          </Button>
        )
      }
    >
      {message}
    </Alert>
  );
};
