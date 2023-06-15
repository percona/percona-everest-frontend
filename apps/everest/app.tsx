import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { QueryClient, QueryClientProvider } from 'react-query';
import { K8ContextProvider } from './contexts/kubernetes/kubernetes.context';
import { Main } from './components/main/Main';


export const EverestApp = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <K8ContextProvider>
        <ThemeContextProvider themeOptions={everestThemeOptions}>
          <Main />
        </ThemeContextProvider>
      </K8ContextProvider>
    </QueryClientProvider>
  );
};
