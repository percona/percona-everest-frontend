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
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAuth } from 'react-oidc-context';
import { DrawerContextProvider } from './contexts/drawer/drawer.context';
import { K8ContextProvider } from './contexts/kubernetes/kubernetes.context';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';

export const EverestApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const {
    isLoading,
    isAuthenticated,
    activeNavigator,
    error,
    user,
  } = useAuth();

  switch (activeNavigator) {
    case "signinSilent":
      console.log('Signing you in..');
    case "signoutRedirect":
      console.log('Signing you out..');
  }

  if (isLoading) {
    console.log('Loading..');
    return null;
  }

  if (error) {
    console.log(error.message);
  }

  if (isAuthenticated) {
    console.log(user);
    // setApiToken(user?.access_token || '');

    return (
      <SnackbarProvider maxSnack={3} preventDuplicate>
        <QueryClientProvider client={queryClient}>
          <K8ContextProvider>
            <DrawerContextProvider>
              <Main />
            </DrawerContextProvider>
          </K8ContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SnackbarProvider>
    );
  }

  return <Login />;
};
