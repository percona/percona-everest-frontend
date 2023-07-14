import { CompositionViewer } from '@percona/design.composition-viewer';
import { everestThemeOptions } from '@percona/design.themes.everest';
import React, { useState } from 'react';
import { Input } from './input';

export const BasicInput = () => {
  const [value, setValue] = useState<number>(0);
  return (
    <CompositionViewer themeOptions={everestThemeOptions}>
      <Input value={value} setValue={setValue} units="CPU" />
    </CompositionViewer>
  );
};
