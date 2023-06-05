import React from 'react';
import { CompositionViewer } from './composition-viewer';

export const BasicCompositionViewer = () => {

  const themeOptions = () => ({
    palette: {
      error: {
        light: '#CE3C3C',
        main: '#BA1A1A',
        dark: '#9F0000',
        contrastText: '#FFFFFF',
      },
      warning: {
        light: '#F0B336',
        main: '#D8A02C',
        dark: '#AA7F26',
        contrastText: '#000000',
      },
      info: {
        light: '#CE3C3C',
        main: '#BA1A1A',
        dark: '#9F0000',
        contrastText: '#FFFFFF',
      },
      success: {
        light: '#127AE8',
        main: '#0E5FB5',
        dark: '#0B4A8C',
        contrastText: '#FFFFFF',
      },
      text: {
        primary: '#303642',
        secondary: 'rgba(48, 54, 66, 0.75)',
        disabled: 'rgba(48, 54, 66, 0.5)',
      },
      action: {
        hover: 'rgba(44, 50, 62, 0.04)',
        hoverOpacity: 0.04,
        disabled: 'rgba(44, 50, 62, 0.12)',
        disabledOpacity: 0.12,
        focus: 'rgba(44, 50, 62, 0.12)',
        focusOpacity: 0.12,
      },
      background: {
        default: '#FFFFFF',
        paper: '#FFFFFF',
      },
    },
  });

  return <CompositionViewer themeOptions={themeOptions}>hello world!</CompositionViewer>;
};
