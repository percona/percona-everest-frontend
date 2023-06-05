import { CompositionViewer } from '@percona/design.composition-viewer';
import { everestThemeOptions } from '@percona/design.themes.everest';
import React, { useState } from 'react';
import { ResourcesDetail } from './resources-detail';

export const BasicResourcesDetail = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <ResourcesDetail
        value={1}
        total={10}
        inputValue={inputValue}
        setInputValue={setInputValue}
        label="CPU"
        labelProgressBar="Using 112.52 CPU (16.7%) of 675.33 CPU in total"
        units="CPU"
      />
    </CompositionViewer>
  );
};
