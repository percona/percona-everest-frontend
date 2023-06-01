import { EverestCompositionViewer } from '@percona/design.everest-composition-viewer';
import React, { useState } from 'react';
import { ResourcesDetail } from './resources-detail';

export const BasicResourcesDetail = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  return (
    <EverestCompositionViewer>
      <ResourcesDetail
        value={1}
        total={10}
        inputValue={inputValue}
        setInputValue={setInputValue}
        label="CPU"
        units="CPU"
      />
    </EverestCompositionViewer>
  );
};
