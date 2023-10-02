import React from 'react';
import { OverviewSectionProps, OverviewSectionTextProps } from './overview-section.types';
import { Grid, Stack, Typography } from '@mui/material';

export const OverviewSection = ({ title, children }: OverviewSectionProps) => (
  <Grid item xs={6}>
    <Stack>
      <Typography color='text.primary' variant='sectionHeading'>{title}</Typography>
      {children}
    </Stack>
  </Grid>
)

export const OverviewSectionText = ({ text }: OverviewSectionTextProps) => (
  <Typography color='text.secondary' variant='caption'>{text}</Typography>
)