import { Box } from '@mui/material';
import React from 'react';

export const LabelValue = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => {
  return value?.toString().length ? (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ minWidth: '140px', fontWeight: 'bold' }}>{label}</Box>
      <Box sx={{ minWidth: '200px' }}>{value}</Box>
    </Box>
  ) : null;
};
