import React from 'react';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { K8ContextProvider } from './contexts/kubernetes/kubernetes.context';
import { DrawerContextProvider } from './contexts/drawer/drawer.context';
import { Main } from './components/main/Main';

export const EverestApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <K8ContextProvider>
          <ThemeContextProvider themeOptions={everestThemeOptions}>
            <DrawerContextProvider>
              <Main />
            </DrawerContextProvider>
          </ThemeContextProvider>
        </K8ContextProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};
