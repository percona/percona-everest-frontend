import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { DbClusterView } from 'pages/databases/DbClusterView';
import { NoMatch } from 'pages/404/NoMatch';
import { DatabasePage } from 'pages/database-form/database-form';
import { Backups } from 'pages/db-cluster-details/backups/backups';
import { ClusterOverview } from 'pages/db-cluster-details/cluster-overview/cluster-overview';
import { DbClusterDetails } from 'pages/db-cluster-details/db-cluster-details';
import { DBClusterDetailsTabs } from 'pages/db-cluster-details/db-cluster-details.types';
import { Settings } from 'pages/settings/settings';
import { SettingsTabs } from 'pages/settings/settings.types';
import { StorageLocations } from 'pages/settings/storage-locations/storage-locations';
import ProtectedRoute from 'components/protected-route/ProtectedRoute';
import { Login } from 'pages/login';
import { everestThemeOptions, ThemeContextProvider } from '@percona/design';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import { NotistackMuiSnackbar } from '@percona/ui-lib';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DrawerContextProvider } from 'contexts/drawer/drawer.context';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Main } from 'components/main/Main';
import { AuthProvider } from 'contexts/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeContextProvider
        themeOptions={everestThemeOptions}
        saveColorModeOnLocalStorage
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            // NOTE: using custom components disables notistack's custom actions, as per docs: https://notistack.com/features/basic#actions
            // If we need actions, we can add them to our custom component via useSnackbar(): https://notistack.com/features/customization#custom-component
            Components={{
              success: NotistackMuiSnackbar,
              error: NotistackMuiSnackbar,
              info: NotistackMuiSnackbar,
              warning: NotistackMuiSnackbar,
            }}
          >
            <DrawerContextProvider>
              <RouterProvider router={router} />
            </DrawerContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeContextProvider>
    </AuthProvider>
  </QueryClientProvider>
);
