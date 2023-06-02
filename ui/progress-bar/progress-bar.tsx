import { Box, LinearProgress } from '@mui/material';
import React from 'react';

export type ProgressBarProps = {
  /**
   * a node to be rendered in the special component.
   */
  value: number;
  buffer: number;
  total: number;
  label: string;
};

export function ProgressBar({ value, buffer, total, label }: ProgressBarProps) {
  const value1Percentage = (value / total) * 100;
  const value2Percentage = (buffer / total) * 100;
  const isOverLimit = value2Percentage > 100;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '37px',
        width: '100%',
      }}
    >
      <Box sx={{ alignSelf: 'end', fontSize: '12px' }}>{label}</Box>
      <LinearProgress
        variant="buffer"
        value={value1Percentage}
        valueBuffer={value2Percentage}
        sx={{
          '&': {
            padding: '4px',
            backgroundColor: 'action.selected',
            borderRadius: '32px',
          },
          '& .MuiLinearProgress-bar': {
            margin: '1.6px',
            borderRadius: '32px',
          },
          '& .MuiLinearProgress-dashed': {
            display: 'none',
          },
          '& .MuiLinearProgress-bar1Buffer': {
            display: isOverLimit ? 'none' : 'block',
          },
          '& .MuiLinearProgress-bar2Buffer': {
            backgroundColor: isOverLimit
              ? 'warning.main'
              : 'primary.contrastText',
            transform: isOverLimit ? 'none !important' : undefined,
          },
        }}
      />
    </Box>
  );
}
