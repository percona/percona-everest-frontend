import { CompositionViewer } from '@percona/design.composition-viewer';
import { everestThemeOptions } from '@percona/design.themes.everest';
import React from 'react';
import { NoMatchIcon } from './no-match';

export const BasicNoMatch = () => {
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <NoMatchIcon w={'300px'} h={'300px'} />
    </CompositionViewer>
  );
};
