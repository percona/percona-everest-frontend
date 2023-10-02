import { Grid, Stack } from '@mui/material';
import { Card } from '@percona/ui-lib.card';
import React from 'react'
import { OverviewSection, OverviewSectionText } from './overview-section/overview-section';

export const ClusterOverview = () => {
  return (
    <Stack
      direction='row'
      flexWrap='wrap'
      useFlexGap
      spacing={2}
      sx={{
        '& > *': {
          flexGrow: 1,
        }
      }}
    >
      <Card
        title='Database details'
        dataTestId='database-details'
        content={
          <Grid container spacing={2}>
            <OverviewSection title='Basic Information'>
              <OverviewSectionText text='Type: MySQL' />
              <OverviewSectionText text='Name: mysql-cluster' />
            </OverviewSection>
            <OverviewSection title='Resources'>
              <OverviewSectionText text='Number of nodes: 1' />
              <OverviewSectionText text='CPU: 450 CPU' />
            </OverviewSection>
            <OverviewSection title='External Access'>
              <OverviewSectionText text='Enabled' />
            </OverviewSection>
            <OverviewSection title='Monitoring'>
              <OverviewSectionText text='Enabled' />
            </OverviewSection>
          </Grid>
        }
      />
      <Card
        title='Connection details'
        dataTestId='connection-details'
        content={
          <Grid container spacing={2}>
            <OverviewSection title='Connection Details'>
              <OverviewSectionText text='Host: http://127.0.0.1' />
            </OverviewSection>
            <OverviewSection title='Port'>
              <OverviewSectionText text='3306' />
            </OverviewSection>
            <OverviewSection title='Username'>
              <OverviewSectionText text='john_doe' />
            </OverviewSection>
            <OverviewSection title='Password'>
              <OverviewSectionText text='***' />
            </OverviewSection>
          </Grid>
        }
      />
    </Stack>
  );
}