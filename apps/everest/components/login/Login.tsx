import { Button, Card, CardContent, Divider, Link, Stack, Typography } from '@mui/material';
import { EverestMainIcon } from '@percona/ui-lib.icons.everest';
// @ts-ignore
import background from '../../assets/login_background.jpeg';
import React from 'react';
import { useAuth } from 'react-oidc-context';
import { setPreviousPath } from '../../utils/oidc';

export const Login = () => {
  const { signinRedirect, clearStaleState } = useAuth();

  const handleLoginClick = async () => {
    setPreviousPath();
    await clearStaleState();
    await signinRedirect();
  }

  return (
    <Stack direction='row' height='100vh'>
      <Stack my={16} mx={5} width='30%'>
        <EverestMainIcon style={{ fontSize: '96px' }} />
        <Typography variant='h4' mt={3}>
          Welcome to Percona Everest, your ultimate destination for database excellence!
        </Typography>
        <Typography mt={3}>
          With Percona Everest, you have the power to effortlessly deploy and masterfully manage your databases. Say goodbye to database complexity and hello to streamlined data operations.
        </Typography>
        <Typography mt={3}>
          Explore the possibilities, and let's conquer the database Everest together!
        </Typography>
      </Stack>
      <Stack sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        backgroundImage: `linear-gradient(to bottom, rgba(211, 211, 211, 0.5), rgba(211, 211, 211, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}>
        <Card sx={{ width: '400px' }} elevation={4}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              px: 5,
              py: 3,
            }}
          >
            <Typography variant='h6' mb={3}>Authenticate</Typography>
            <Button size='large' variant='contained' sx={{ mb: 4 }} onClick={handleLoginClick}>
              Login
            </Button>
            <Divider flexItem>
              <Typography variant='overline' color='text.secondary'>OR</Typography>
            </Divider>
            <Typography variant='caption' color='text.secondary' gutterBottom>Are you new to Percona Everest?</Typography>
            <Button variant='text' size='small'>Contact us</Button>
            <Typography variant='caption' color='text.secondary' mt={2}>
              By submitting my personal information, I acknowledge that Percona will communicate with me about its products and services.
              I understand that I can unsubscribe from these communications in accordance with the Percona&nbsp;
              <Link
                href='https://www.percona.com/privacy-policy'
                target="_blank"
                rel="noopener noreferrer"
                underline='none'
                variant='caption'
                color='#9965D9'
              >
                Privacy Policy
              </Link>
              .
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};
