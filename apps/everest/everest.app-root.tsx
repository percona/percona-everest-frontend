import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { EverestApp } from './app';
import { DbClusterDetails } from './pages/db-cluster-details/db-cluster-details';
import { DBClusterDetailsTabs } from './pages/db-cluster-details/db-cluster-details.types';
import { DatabasePage } from './pages/database-form/database-form';
import { DatabasesPage } from './pages/databases/databases';
import { Settings } from './pages/settings/settings';
import { SettingsTabs } from './pages/settings/settings.types';
import { StorageLocations } from './pages/settings/storage-locations/storage-locations';
import { ClusterOverview } from './pages/db-cluster-details/cluster-overview/cluster-overview';
import { AuthProvider } from 'react-oidc-context';
import { authConfigBuilder } from './auth-config';
import { getPreviousPath } from './utils/oidc';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { AuthConfigFetcher } from './components/auth-config-fetcher/AuthConfigFetcher';
import { Backups } from './pages/db-cluster-details/backups/backups';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EverestApp />,
    children: [
      {
        path: 'databases',
        element: <DatabasesPage />,
      },
      {
        path: 'databases/new',
        element: <DatabasePage />,
      },
      {
        path: 'databases/edit',
        element: <DatabasePage />,
      },
      {
        path: 'databases/:dbClusterName',
        element: <DbClusterDetails />,
        children: [
          {
            index: true,
            path: DBClusterDetailsTabs.backups,
            element: <Backups />,
          },
          {
            path: DBClusterDetailsTabs.overview,
            element: <ClusterOverview />,
          },
        ],
      },
      {
        index: true,
        element: <Navigate to="/databases" replace />,
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          // {
          //   path: SettingsTabs.defaultConfigurations,
          //   element: <DefaultConfigurations />,
          // },
          {
            path: SettingsTabs.storageLocations,
            element: <StorageLocations />,
          },
          {
            index: true,
            element: <Navigate to={SettingsTabs.storageLocations} replace />,
          },
          // {
          //   path: SettingsTabs.monitoringEndpoints,
          //   element: <MonitoringEndpoints />,
          // },
          // {
          //   path: SettingsTabs.k8sClusters,
          //   element: <K8sClusters />,
          // },
        ],
      },
      {
        path: 'callback',
        element: <Navigate to={getPreviousPath()} replace />,
      },
    ],
  },
]);

ReactDOM.render(
  <AuthConfigFetcher>
    {({ auth: { web: { clientID, issuer, url } } }) => (
      <AuthProvider {...authConfigBuilder(issuer, clientID, url)}>
        <ThemeContextProvider themeOptions={everestThemeOptions}>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </AuthProvider>
    )}
  </AuthConfigFetcher>,
  document.getElementById('root')
);
