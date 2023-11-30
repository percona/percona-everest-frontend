import { addApiAuthInterceptor, api, removeApiAuthInterceptor } from 'api/api';
import { useVersion } from 'hooks/api/version/useVersion';
import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './auth.context';
import { UserAuthStatus } from './auth.context.types';

const setApiBearerToken = (password: string) =>
  (api.defaults.headers.common['Authorization'] = `Bearer ${password}`);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, _setAuthStatus] = useState<UserAuthStatus>('unknown');
  const [apiCallEnabled, setApiCallEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState<string | null>(null);

  const login = (password: string) => {
    _setAuthStatus('loggingIn');
    setApiBearerToken(password);
    setPassword(password);
    // This will trigger the API call to "/version"
    setApiCallEnabled(true);
  };

  const logout = () => {
    localStorage.setItem('pwd', '');
    setApiBearerToken('');
    setRedirect(null);
    _setAuthStatus('loggedOut');
    removeApiAuthInterceptor();
  };

  const setAuthStatus = (newStatus: UserAuthStatus) =>
    _setAuthStatus(newStatus);

  const setRedirectRoute = (route: string) => {
    setRedirect(route);
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem('pwd');

    if (savedPassword) {
      login(savedPassword);
    } else {
      _setAuthStatus('loggedOut');
    }
  }, []);

  // We use the "/version" API call just to make sure the password works
  // At this point, there's not really a login flow, per se
  useVersion({
    enabled: apiCallEnabled,
    retry: false,
    onSuccess: () => {
      setApiCallEnabled(false);
      _setAuthStatus('loggedIn');
      setApiBearerToken(password);
      localStorage.setItem('pwd', password);
      addApiAuthInterceptor();
    },
    onError: () => {
      _setAuthStatus('loggedOut');
      setApiCallEnabled(false);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        authStatus,
        setAuthStatus,
        redirectRoute: redirect,
        setRedirectRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
