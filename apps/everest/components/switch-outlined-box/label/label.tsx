import React from 'react';
import { Typography, Box } from '@mui/material';
import { LabelProps } from './label.types';

export const Label = ({ labelHeader, labelDescription, sx }: LabelProps) => {
  return (
    <Box sx={{ ml: 1, ...sx }}>
      {labelHeader && (
        <Typography data-testid="label-header" variant="subtitle2">
          {labelHeader}
        </Typography>
      )}
      {labelDescription && (
        <Typography data-testid="label-message" variant="caption">
          {labelDescription}
        </Typography>
      )}
    </Box>
  );
};
