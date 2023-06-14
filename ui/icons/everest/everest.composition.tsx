import React from 'react';
import { Grid } from '@mui/material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { everestThemeOptions } from '@percona/design.themes.everest';
import {
  EverestMainIcon,
  EverestHorizontalIcon,
  EverestHorizontalAlternateIcon,
  EverestAppSquareIcon,
  EverestAppRoundIcon,
  EverestAppCircleIcon,
} from './everest';

export const Icons = () => (
  <CompositionViewer themeOptions={everestThemeOptions}>
    <Grid container spacing={2} sx={{ fontSize: '100px', margin: 0 }}>
      <Grid item xs={4}>
        <EverestMainIcon fontSize="inherit" />
      </Grid>
      <Grid item xs={4}>
        <EverestHorizontalIcon fontSize="inherit" />
      </Grid>
      <Grid item xs={4}>
        <EverestHorizontalAlternateIcon fontSize="inherit" />
      </Grid>
      <Grid item xs={4}>
        <EverestAppSquareIcon fontSize="inherit" />
      </Grid>
      <Grid item xs={4}>
        <EverestAppRoundIcon fontSize="inherit" />
      </Grid>
      <Grid item xs={4}>
        <EverestAppCircleIcon fontSize="inherit" />
      </Grid>
    </Grid>
  </CompositionViewer>
);
