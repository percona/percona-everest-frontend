import { AuthProviderProps } from 'react-oidc-context';

const authConfig: AuthProviderProps = {
  authority: 'https://account.127.0.0.1.nip.io',
  client_id: '236248997172457477@everest_test',
  redirect_uri: 'http://localhost:3000/callback',
  post_logout_redirect_uri: 'http://localhost:3000/',
  scope: 'openid profile email',
  response_type: 'code',
  response_mode: 'query',
  // userStore: new WebStorageStateStore({ store: window.localStorage }),
  // onSigninCallback: () => {
  // }
};

export { authConfig };
