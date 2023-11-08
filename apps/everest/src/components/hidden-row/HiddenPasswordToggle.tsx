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

import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Messages } from './HiddenPasswordToggle.messages';
import { CopyToClipboardButton } from '@percona/ui-lib';

type HideRowProps = {
  value: string;
  fixedAsteriskLength?: boolean;
  showCopy?: boolean;
};
export const HiddenPasswordToggle = ({
  value,
  fixedAsteriskLength = true,
  showCopy = false,
}: HideRowProps) => {
  const [show, setShow] = useState(false);
  const formattedValue = show
    ? value
    : fixedAsteriskLength
    ? Messages.asteriskHiddenText
    : value.replace(/./g, '*');

  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        minHeight: '45px'
      }}
      data-testid="hidden-row"
    >
      <Typography variant='body2' sx={{ wordBreak: 'break-all', pt: 0.5 }}>
        {formattedValue}
      </Typography>
      <IconButton
        onClick={toggle}
        aria-label={`visibility-${show ? 'off' : 'on'}`}
        sx={{ mt: -1 }}
      >
        {show ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
      </IconButton>
      {showCopy && <CopyToClipboardButton buttonSx={{ mt: -1 }}  textToCopy={value} />}
    </Box>
  );
};
