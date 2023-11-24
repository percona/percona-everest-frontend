import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';
import { Card, EverestMainIcon, TextInput, DialogTitle } from '@percona/ui-lib';
import { AuthContext } from 'contexts/auth/auth.context';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const methods = useForm<{ password: string }>({
    defaultValues: { password: '' },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { login, loggingIn, authenticated } = useContext(AuthContext);

  const handleClick = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleLogin = () => login(methods.getValues('password'));

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Stack flexDirection="row" height="100vh">
      <Stack py={16} px={5} width="35%">
        <EverestMainIcon sx={{ fontSize: '110px', mb: 3 }} />
        <Typography variant="h4" mb={3}>
          Welcome to Percona Everest, your ultimate destination for database
          excellence!
        </Typography>
        <Typography mb={3}>
          With Percona Everest, you have the power to effortlessly deploy and
          masterfully manage your databases. Say goodbye to database complexity
          and hello to streamlined data operations.
        </Typography>
        <Typography>
          Explore the possibilities, and let's conquer the database Everest
          together!
        </Typography>
      </Stack>
      <Box
        width="65%"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: "url('static/login_bg.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Card
          dataTestId="foo"
          sx={{
            width: '400px',
            py: 1,
            px: 3,
          }}
          content={
            <Stack alignItems="center">
              <Typography variant="h6" mb={3}>
                Log in
              </Typography>
              <Typography variant="caption" mb={2}>
                Insert the password you have received during the installation in
                your terminal.
              </Typography>
              <FormProvider {...methods}>
                <TextInput
                  textFieldProps={{
                    type: 'password',
                    label: 'Password',
                    fullWidth: true,
                    sx: { mb: 2 },
                    disabled: loggingIn,
                  }}
                  name="password"
                />
                <Button
                  disabled={loggingIn}
                  onClick={handleLogin}
                  variant="contained"
                  fullWidth
                >
                  Log in
                </Button>
              </FormProvider>
              <Typography
                variant="caption"
                color="text.secondary"
                mt={4}
                mb={1.5}
              >
                By submitting my personal information, I acknowledge that
                Percona will communicate with me about its products and
                services. I understand that I can unsubscribe from these
                communications in accordance with the Percona Privacy Policy.
              </Typography>
              <Button
                onClick={handleClick}
                variant="text"
                sx={{ alignSelf: 'flex-start' }}
                disabled={loggingIn}
              >
                Reset password
              </Button>
            </Stack>
          }
        />
      </Box>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle onClose={handleClose}>Reset password</DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="text.primary">
            Use your terminal to reset your password. Lorem ipsum dolor sit amet
            adipiscing consecteur.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Login;
