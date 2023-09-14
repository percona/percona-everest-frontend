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

import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type HideRowProps = {
  value: string;
};
export const HiddenRow = ({ value }: HideRowProps) => {
  const [show, setShow] = useState(false);
  const formattedValue = show ? value : value.replace(/./g, '*');
  const toggle = () => {
    setShow((prevState) => !prevState);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box data-testid="hidden-row" sx={{ mt: '3px' }}>{formattedValue}</Box>
      {show ? (
        <IconButton onClick={toggle} aria-label="visibility-off">
          <VisibilityOffIcon />
        </IconButton>
      ) : (
        <IconButton onClick={toggle} aria-label="visibility-on">
          <VisibilityIcon />
        </IconButton>
      )}
    </Box>
  );
};
