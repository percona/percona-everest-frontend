import { addApiAuthInterceptor, api, removeApiAuthInterceptor } from 'api/api';
import { useVersion } from 'hooks/api/version/useVersion';
import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './auth.context';

const setApiBearerToken = (password: string) =>
  (api.defaults.headers.common['Authorization'] = `Bearer ${password}`);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [apiCallEnabled, setApiCallEnabled] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');

  const login = (password: string) => {
    setLoggingIn(true);
    setApiBearerToken(password);
    setPassword(password);
    // This will trigger the API call to "/version"
    setApiCallEnabled(true);
  };

  const logout = () => {
    localStorage.setItem('pwd', '');
    setApiBearerToken('');
    setAuthenticated(false);
    removeApiAuthInterceptor();
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem('pwd');

    if (savedPassword) {
      login(savedPassword);
    } else {
      setAuthenticated(false);
    }
  }, []);

  // We use the "/version" API call just to make sure the password works
  // At this point, there's not really a login flow, per se
  useVersion({
    enabled: apiCallEnabled,
    retry: false,
    onSuccess: () => {
      setApiCallEnabled(false);
      setAuthenticated(true);
      setApiBearerToken(password);
      setLoggingIn(false);
      localStorage.setItem('pwd', password);
      addApiAuthInterceptor();
    },
    onError: () => {
      setLoggingIn(false);
      setApiCallEnabled(false);
      setAuthenticated(false);
    },
  });

  return (
    <AuthContext.Provider value={{ login, logout, loggingIn, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
