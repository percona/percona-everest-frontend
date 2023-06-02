import { EverestCompositionViewer } from '@percona/design.everest-composition-viewer';
import React from 'react';
import { ResourcesDetails } from './resources-details';

export const BasicResourcesDetails = () => {
  return (
    <EverestCompositionViewer>
      <ResourcesDetails />
    </EverestCompositionViewer>
  );
};
