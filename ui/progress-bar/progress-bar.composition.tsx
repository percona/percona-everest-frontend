import { CompositionViewer } from '@percona/design.composition-viewer';
import { everestThemeOptions } from '@percona/design.themes.everest';
import React from 'react';
import { ProgressBar } from './progress-bar';

export const BasicProgressBar = () => {
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <ProgressBar
        label="Using 112.52 CPU (16.7%) of 675.33 CPU in total"
        buffer={7}
        value={5}
        total={10}
      />
    </CompositionViewer>
  );
};

export const ExceededProgressBar = () => {
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <ProgressBar
        label="Using 112.52 CPU (16.7%) of 675.33 CPU in total"
        buffer={12}
        value={5}
        total={10}
      />
    </CompositionViewer>
  );
};
