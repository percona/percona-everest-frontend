import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx'
import { DatabasesPage, } from '@/pages/databases/databases.tsx';
import { NoMatch } from '@/pages/404/NoMatch.tsx';
import { DatabasePage } from '@/pages/database-form/database-form.tsx';
import { Backups } from '@/pages/db-cluster-details/backups/backups.tsx';
import { ClusterOverview } from '@/pages/db-cluster-details/cluster-overview/cluster-overview.tsx';
import { DbClusterDetails } from '@/pages/db-cluster-details/db-cluster-details.tsx';
import { DBClusterDetailsTabs } from '@/pages/db-cluster-details/db-cluster-details.types.ts';
import { Settings } from '@/pages/settings/settings.tsx';
import { SettingsTabs } from '@/pages/settings/settings.types.ts';
import { StorageLocations } from '@/pages/settings/storage-locations/storage-locations.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
