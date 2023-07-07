import React from 'react';
import { Typography, Box } from '@mui/material';
import { LabelProps } from './label.types';

export const Label = ({ labelHeader, labelMessage, sx }: LabelProps) => {
  return (
    <Box sx={{ ml: 1, ...sx }}>
      {labelHeader && (
        <Typography variant="subtitle2">{labelHeader}</Typography>
      )}
      {labelMessage && (
        <Typography variant="caption">{labelMessage}</Typography>
      )}
    </Box>
  );
};
