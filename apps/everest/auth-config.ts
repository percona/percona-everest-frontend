import { AuthProviderProps } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';

let authConfig: AuthProviderProps | null = null;

const authConfigBuilder = (authority: string, clientId: string, url: string): AuthProviderProps => {
  if (authConfig === null) {
    authConfig = {
      authority,
      client_id: clientId,
      redirect_uri: process.env.HOST_URL ? `${process.env.HOST_URL}/callback` : `${url}/callback`,
      post_logout_redirect_uri: process.env.HOST_URL ? process.env.HOST_URL : url,
      scope: 'openid profile email',
      response_type: 'code',
      response_mode: 'query',
      loadUserInfo: true,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    }
  }

  return authConfig;
};

export { authConfig, authConfigBuilder };
