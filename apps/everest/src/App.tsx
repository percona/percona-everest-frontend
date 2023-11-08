import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeContextProvider, everestThemeOptions } from '@percona/design';
import { SnackbarProvider } from 'notistack';
import { K8ContextProvider } from 'contexts/kubernetes/kubernetes.context';
import { DrawerContextProvider } from 'contexts/drawer/drawer.context';
import { Main } from 'components/main/Main';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <QueryClientProvider client={queryClient}>
        <K8ContextProvider>
          <ThemeContextProvider themeOptions={everestThemeOptions}>
            <DrawerContextProvider>
              <Main />
            </DrawerContextProvider>
          </ThemeContextProvider>
        </K8ContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default App;
