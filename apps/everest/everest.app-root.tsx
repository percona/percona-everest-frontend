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
      // {
      //   path: 'settings',
      //   element: <Settings />,
      //   children: [
      //     {
      //       path: SettingsTabs.defaultConfigurations,
      //       element: <DefaultConfigurations />,
      //     },
      //     {
      //       path: SettingsTabs.storageLocations,
      //       element: <StorageLocations />,
      //     },
      //     {
      //       path: SettingsTabs.monitoringEndpoints,
      //       element: <MonitoringEndpoints />,
      //     },
      //     {
      //       path: SettingsTabs.k8sClusters,
      //       element: <K8sClusters />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
