import { Box } from '@mui/material';
import { ProgressBar } from '@percona/everest.ui.resources-details.progress-bar';
import { Input } from '@percona/ui.input';
import React from 'react';

export type ResourcesDetailProps = {
  /**
   * a node to be rendered in the special component.
   */
  label: string;
  labelProgressBar: string;
  units: string;
  value: number;
  total: number;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
};

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
