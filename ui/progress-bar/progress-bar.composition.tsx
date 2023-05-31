import { EverestCompositionViewer } from '@percona/design.everest-composition-viewer';
import React from 'react';
import { ProgressBar } from './progress-bar';

export const BasicProgressBar = () => {
  return (
    <EverestCompositionViewer>
      <ProgressBar
        label="Using 112.52 CPU (16.7%) of 675.33 CPU in total"
        buffer={10}
        value={5}
        total={10}
      />
    </EverestCompositionViewer>
  );
};
