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

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Button, IconButton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useActiveBreakpoint } from '@/hooks/utils/useActiveBreakpoint';
import { Messages } from './code-copy-block.messages';
import { CodeCopyBlockProps } from './code-copy-block.types';

export const CodeCopyBlock = ({
  message,
  showCopyButtonText,
  snackbarSuccessMessage,
}: CodeCopyBlockProps) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message);
    enqueueSnackbar(snackbarSuccessMessage || Messages.copyToClipboardTooltip, {
      variant: 'success',
    });
  };
  const { isMobile } = useActiveBreakpoint();

  return (
    <Alert
      severity="info"
      icon={false}
      sx={{
        mt: 0.5,
        mb: 0.5,
        '& .MuiAlert-action': {
          alignItems: 'center',
          pt: 0,
        },
      }}
      action={
        navigator.clipboard &&
        window.isSecureContext &&
        (showCopyButtonText ? (
          <Button
            size="small"
            color="primary"
            onClick={copyToClipboard}
            sx={{
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: 1,
              fontWeight: 600,
            }}
          >
            <ContentCopyIcon />{' '}
            {!isMobile && showCopyButtonText && Messages.copyCommand}
          </Button>
        ) : (
          <IconButton
            aria-label="copy to clipboard"
            color="primary"
            size="small"
            sx={{
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: 1,
              fontWeight: 600,
            }}
            data-testid="close-dialog-icon"
            onClick={copyToClipboard}
          >
            <ContentCopyIcon />
          </IconButton>
        ))
      }
    >
      {message}
    </Alert>
  );
};
