import React from 'react';
import { MenuItem } from '@mui/material';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { MenuButton } from './menu-button';

export const Menu = () => {
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <MenuButton buttonText="Create backup">
        {() => [
          <MenuItem key="now">Now</MenuItem>,
          <MenuItem key="schedule">Schedule</MenuItem>,
        ]}
      </MenuButton>
    </CompositionViewer>
  );
};
