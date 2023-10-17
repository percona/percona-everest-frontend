// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DrawerContextProvider } from './contexts/drawer/drawer.context';
import { K8ContextProvider } from './contexts/kubernetes/kubernetes.context';
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
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <QueryClientProvider client={queryClient}>
        <K8ContextProvider>
          <ThemeContextProvider themeOptions={everestThemeOptions}>
            <DrawerContextProvider>
              <Main />
            </DrawerContextProvider>
          </ThemeContextProvider>
        </K8ContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SnackbarProvider>
  );
};
