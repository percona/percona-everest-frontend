import React from 'react';
import { OverviewSectionProps, OverviewSectionTextProps } from './overview-section.types';
import { Grid, Skeleton, Stack, Typography } from '@mui/material';

export const OverviewSection = ({ title, loading, children }: OverviewSectionProps) => (
  <Grid item xs={6}>
    <Stack>
      <Typography color='text.primary' variant='sectionHeading'>{title}</Typography>
      {React.Children.map(children, child => (
        loading ? <Skeleton /> : <>{child}</>
      ))}
    </Stack>
  </Grid>
)

export const OverviewSectionText = ({ children }: OverviewSectionTextProps) => (
  <Typography color='text.secondary' variant='caption'>{children}</Typography>
)