import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Login } from 'pages/login';
import ProtectedRoute from 'components/protected-route/ProtectedRoute';
import { Main } from 'components/main/Main';
import { DbClusterView } from 'pages/databases/DbClusterView';
import { DatabasePage } from 'pages/database-form/database-form';
import { DbClusterDetails } from 'pages/db-cluster-details/db-cluster-details';
import { DBClusterDetailsTabs } from 'pages/db-cluster-details/db-cluster-details.types';
import { ClusterOverview } from 'pages/db-cluster-details/cluster-overview/cluster-overview';
import { Settings } from 'pages/settings/settings';
import { SettingsTabs } from 'pages/settings/settings.types';
import { StorageLocations } from 'pages/settings/storage-locations/storage-locations';
import { MonitoringEndpoints } from 'pages/settings/monitoring-endpoints/monitoring-endpoints';
import { NoMatch } from 'pages/404/NoMatch';
import { Backups } from 'pages/db-cluster-details/backups/backups';
import { Namespaces } from './pages/settings/namespaces/namespaces';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Main />,
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'databases',
        element: <DbClusterView />,
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
            path: SettingsTabs.monitoringEndpoints,
            element: <MonitoringEndpoints />,
          },
          {
            path: SettingsTabs.namespaces,
            element: <Namespaces />,
          },
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

export default router;
