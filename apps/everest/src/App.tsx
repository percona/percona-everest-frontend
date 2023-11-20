import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeContextProvider, everestThemeOptions } from '@percona/design';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DrawerContextProvider } from 'contexts/drawer/drawer.context';
import { Main } from 'components/main/Main';
import { NotistackMuiSnackbar } from '@percona/ui-lib';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
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
          <QueryClientProvider client={queryClient}>
            <DrawerContextProvider>
              <Main />
            </DrawerContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeContextProvider>
  );
};

export default App;
