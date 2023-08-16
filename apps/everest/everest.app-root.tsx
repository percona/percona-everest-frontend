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
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { EverestApp } from './app';
import { DatabasesPage } from './pages/databases/databases';
import { DatabasePage } from './pages/database-form/database-form';
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
        element: <DatabasePage />,
      },
      {
        path: 'databases/edit',
        element: <DatabasePage />,
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
