import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { EverestApp } from './app';
import { DatabasesPage } from './pages/databases/databases';
import { NewDatabasePage } from './pages/new-database/new-database';
import { Settings } from './pages/settings/settings';
import { DefaultConfigurations } from './pages/settings/default-configurations/default-configurations';
import { StorageLocations } from './pages/settings/storage-locations/storage-locations';
import { MonitoringEndpoints } from './pages/settings/monitoring-endpoints/monitoring-endpoints';
import { K8sClusters } from './pages/settings/k8s-clusters/k8s-clusters';
import { SettingsTabs } from './pages/settings/settings.types';

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
        element: <NewDatabasePage />,
      },
      {
        index: true,
        element: <Navigate to="/databases" replace />,
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          {
            path: SettingsTabs.defaultConfigurations,
            element: <DefaultConfigurations />,
          },
          {
            path: SettingsTabs.storageLocations,
            element: <StorageLocations />,
          },
          {
            path: SettingsTabs.monitoringEndpoints,
            element: <MonitoringEndpoints />,
          },
          {
            path: SettingsTabs.k8sClusters,
            element: <K8sClusters />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
