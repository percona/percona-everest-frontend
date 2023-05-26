import React from 'react';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { EverestCompositionViewerProps } from './everest-composition-viewer.types';
import { getTheme } from '@percona/design.themes.everest';

export const EverestCompositionViewer = ({
  children,
}: EverestCompositionViewerProps) => (
  <CompositionViewer getThemeFn={getTheme}>{children}</CompositionViewer>
);
