import { Grid, Stack } from '@mui/material';
import { Card } from '@percona/ui-lib.card';
import React from 'react'
import { OverviewSection, OverviewSectionText } from './overview-section/overview-section';
import { HiddenPasswordToggle } from '../../components/hidden-row/HiddenPasswordToggle';

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
              <OverviewSectionText>Type: MySQL</OverviewSectionText>
              <OverviewSectionText>Name: mysql-cluster</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Resources'>
              <OverviewSectionText>Number of nodes: 1</OverviewSectionText>
              <OverviewSectionText>CPU: 450 CPU</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='External Access'>
              <OverviewSectionText>Enabled</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Monitoring'>
              <OverviewSectionText>Enabled</OverviewSectionText>
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
              <OverviewSectionText>Host: http://127.0.0.1</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Port'>
              <OverviewSectionText>3306</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Username'>
              <OverviewSectionText>john_doe</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Password'>
              <OverviewSectionText>
                <HiddenPasswordToggle value='foo_bar_doe' />
              </OverviewSectionText>
            </OverviewSection>
          </Grid>
        }
      />
    </Stack>
  );
}