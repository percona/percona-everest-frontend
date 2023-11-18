import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeContextProvider, everestThemeOptions } from '@percona/design';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SnackbarProvider maxSnack={3} preventDuplicate>
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider
            themeOptions={everestThemeOptions}
            saveColorModeOnLocalStorage
          >
            <DrawerContextProvider>
              <Main />
            </DrawerContextProvider>
          </ThemeContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
};

export default App;
