import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const DatabasesPage = () => {
  return (
    <Stack direction='row' alignItems='center'>
      <Typography variant='h5'>Databases</Typography>
      <Button size='small' sx={{ marginLeft: 'auto' }} startIcon={<AddIcon />} variant="outlined">Create Database</Button>
    </Stack>
  );
};
