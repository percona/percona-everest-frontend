import { Grid } from '@mui/material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { everestThemeOptions } from '@percona/design.themes.everest';
import React from 'react';
import {
  ErrorIcon,
  PausedIcon,
  PendingIcon,
  SuccessIcon,
  UknownIcon,
  WarningIcon,
} from './status';

export const BasicStatus = () => {
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <Grid container spacing={2}>
        <Grid item>
          <ErrorIcon size="large" />
        </Grid>
        <Grid item>
          <ErrorIcon size="small" />
        </Grid>
        <Grid item>
          <WarningIcon size="large" />
        </Grid>
        <Grid item>
          <WarningIcon size="small" />
        </Grid>
        <Grid item>
          <PendingIcon size="large" />
        </Grid>
        <Grid item>
          <PendingIcon size="small" />
        </Grid>
        <Grid item>
          <SuccessIcon size="large" />
        </Grid>
        <Grid item>
          <SuccessIcon size="small" />
        </Grid>
        <Grid item>
          <UknownIcon size="large" />
        </Grid>
        <Grid item>
          <UknownIcon size="small" />
        </Grid>
        <Grid item>
          <PausedIcon size="large" />
        </Grid>
        <Grid item>
          <PausedIcon size="small" />
        </Grid>
      </Grid>
    </CompositionViewer>
  );
};
