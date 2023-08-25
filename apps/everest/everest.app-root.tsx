import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { EverestApp } from './app';
import { Backups } from './pages/backups/backups';
import { BackupsList } from './pages/backups/backups-list/backups-list';
import { BackupsTabs } from './pages/backups/backups.types';
import { DatabasesPage } from './pages/databases/databases';
import { NewDatabasePage } from './pages/new-database/new-database';
import { DefaultConfigurations } from './pages/settings/default-configurations/default-configurations';
import { K8sClusters } from './pages/settings/k8s-clusters/k8s-clusters';
import { MonitoringEndpoints } from './pages/settings/monitoring-endpoints/monitoring-endpoints';
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
        element: <NewDatabasePage />,
      },
      {
        path: 'databases/:dbClusterName',
        element: <Backups />,
        children: [
          {
            index: true,
            path: BackupsTabs.backups,
            element: <BackupsList />,
          },
          // TODO: uncomment when ready
          // {
          //   path: BackupsTabs.generalInformation,
          //   element: <GeneralInformation />,
          // },
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
