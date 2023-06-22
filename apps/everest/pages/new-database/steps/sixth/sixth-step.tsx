import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Messages } from './sixth-step.messages';

export const SixthStep = () => {
  return (
    <Stack alignItems='center'>
      <Stack direction='row' alignItems='center'>
        <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 64, mr: 1 }} />
        <Stack direction='column'>
          <Typography variant='h6'>{Messages.dbBeingCreated}</Typography>
          <Typography variant='caption'>{Messages.sitTight}</Typography>
        </Stack>
      </Stack>
      <Button
        variant='outlined'
        component={Link}
        to="/databases"
        size='small'
        sx={{ mt: 4 }}
      >
        {Messages.goToList}
      </Button>
    </Stack>
  );
};
