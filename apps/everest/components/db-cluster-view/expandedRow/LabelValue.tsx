import { Box } from '@mui/material';
import React from 'react';

export const LabelValue = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '140px', fontWeight: 'bold' }}>{label}</Box>
      <Box sx={{ minWidth: '200px' }}>{value}</Box>
    </Box>
  );
};
