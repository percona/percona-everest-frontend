import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { EverestApp } from './app';
import { NoMatch } from './pages/404/NoMatch';
import { Backups } from './pages/backups/backups';
import { ClusterOverview } from './pages/cluster-overview/cluster-overview';
import { DatabasePage } from './pages/database-form/database-form';
import { DatabasesPage } from './pages/databases/databases';
import { DbClusterDetails } from './pages/db-cluster-details/db-cluster-details';
import { DBClusterDetailsTabs } from './pages/db-cluster-details/db-cluster-details.types';
import { Settings } from './pages/settings/settings';
import { SettingsTabs } from './pages/settings/settings.types';
import { StorageLocations } from './pages/settings/storage-locations/storage-locations';

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
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
