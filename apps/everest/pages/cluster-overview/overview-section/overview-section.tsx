import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { LoadableChildren } from '@percona/ui-lib.loadable-children';
import { OverviewSectionProps, OverviewSectionTextProps } from './overview-section.types';

export const OverviewSection = ({ title, loading, children }: OverviewSectionProps) => (
  <Grid item xs={6} data-testid="overview-section">
    <Stack>
      {/* @ts-ignore */}
      <Typography color='text.primary' variant='sectionHeading'>{title}</Typography>
      <LoadableChildren loading={loading}>{children}</LoadableChildren>
    </Stack>
  </Grid>
)

export const OverviewSectionText = ({ children }: OverviewSectionTextProps) => (
  <Typography color='text.secondary' variant='caption'>{children}</Typography>
)
