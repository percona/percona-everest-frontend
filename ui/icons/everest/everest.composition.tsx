import React from 'react';
import { EverestMainIcon, EverestHorizontalIcon } from './everest';
import { Container } from '@mui/material';
import { EverestCompositionViewer } from '@percona/design.everest-composition-viewer';

const IconViewer = ({ children }: { children: React.ReactNode }) => (
  <Container sx={{ fontSize: '100px' }}>
    {children}
  </Container>
);

export const MainIcon = () => (
  <IconViewer>
    <EverestMainIcon fontSize='inherit' />
  </IconViewer>
);

export const HorizontalIcon = () => (
  <EverestCompositionViewer>
    <IconViewer>
      <EverestHorizontalIcon fontSize='inherit' />
    </IconViewer>
  </EverestCompositionViewer>
);