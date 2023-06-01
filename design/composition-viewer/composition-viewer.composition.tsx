import React from 'react';
import { CompositionViewer } from './composition-viewer';
import { baseThemeOptions } from '@percona/design.themes.base';

export const BasicCompositionViewer = () => {
  return <CompositionViewer themeOptions={baseThemeOptions}>hello world!</CompositionViewer>;
};
