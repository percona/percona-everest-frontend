import React from 'react';
import mediaQuery from 'css-mediaquery';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';

export const createMatchMedia = (width: number) => {
  return (query) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: '',
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
};

export const resizeScreenSize = (width: number) => {
  window.matchMedia = createMatchMedia(width);
};

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      {children}
    </ThemeContextProvider>
  </MemoryRouter>
);
