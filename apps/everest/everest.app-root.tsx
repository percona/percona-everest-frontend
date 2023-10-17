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
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
