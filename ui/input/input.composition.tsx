import { EverestCompositionViewer } from '@percona/design.everest-composition-viewer';
import React, { useState } from 'react';
import { Input } from './input';

export const BasicInput = () => {
  const [value, setValue] = useState<number>(0);
  return <EverestCompositionViewer><Input value={value} setValue={setValue} units="CPU" /></EverestCompositionViewer>;
};
