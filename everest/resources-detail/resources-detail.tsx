import { Box } from '@mui/material';
import { Input } from '@percona/ui.input';
import { ProgressBar } from '@percona/ui.progress-bar';
import React from 'react';
import { ResourcesDetailProps } from './resources-detail.types';

export function ResourcesDetail({
  label,
  labelProgressBar,
  units,
  value,
  total,
  inputValue,
  setInputValue,
}: ResourcesDetailProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ minWidth: '100px', color: 'text.primary' }}>{label}</Box>
      <Box sx={{ maxWidth: '150px' }}>
        <Input value={inputValue} setValue={setInputValue} units={units} />
      </Box>
      <ProgressBar
        label={labelProgressBar}
        buffer={inputValue}
        value={value}
        total={total}
      />
    </Box>
  );
}
