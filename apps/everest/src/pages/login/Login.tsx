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
import { AuthContext } from 'contexts/auth';
import { useContext, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Messages } from './Login.messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, loginSchema } from './Login.constants';

const Login = () => {
  const methods = useForm<LoginFormType>({
    mode: 'onChange',
    defaultValues: { password: '' },
    resolver: zodResolver(loginSchema),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { login, loggingIn, authenticated } = useContext(AuthContext);

  const handleClick = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleLogin: SubmitHandler<LoginFormType> = ({ password }) =>
    login(password);

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Stack flexDirection="row" height="100vh">
      <Stack py={16} px={5} width="35%">
        <EverestMainIcon sx={{ fontSize: '110px', mb: 3 }} />
        <Typography variant="h4" mb={3}>
          {Messages.welcome}
        </Typography>
        <Typography mb={3}>{Messages.intro1}</Typography>
        <Typography>{Messages.intro2}</Typography>
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
                {Messages.login}
              </Typography>
              <Typography variant="caption" mb={2}>
                {Messages.insertPassword}
              </Typography>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleLogin)}>
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
                    onClick={methods.handleSubmit(handleLogin)}
                    disabled={loggingIn}
                    data-testid="login-button"
                    variant="contained"
                    fullWidth
                  >
                    {Messages.login}
                  </Button>
                </form>
              </FormProvider>
              <Typography
                variant="caption"
                color="text.secondary"
                mt={4}
                mb={1.5}
              >
                {Messages.ack}
              </Typography>
              <Button
                onClick={handleClick}
                variant="text"
                sx={{ alignSelf: 'flex-start' }}
                disabled={loggingIn}
              >
                {Messages.resetPassword}
              </Button>
            </Stack>
          }
        />
      </Box>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle onClose={handleClose}>
          {Messages.resetPassword}
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="text.primary">
            {Messages.useTerminal}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            {Messages.ok}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Login;