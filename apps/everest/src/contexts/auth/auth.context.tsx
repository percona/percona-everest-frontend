import { useVersion } from 'hooks/api/version/useVersion';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { AuthContextProps } from './auth.context.types';
import { api } from 'api/api';

const setApiBearerToken = (password: string) =>
  (api.defaults.headers.common['Authorization'] = `Bearer ${password}`);

export const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  loggingIn: false,
  authenticated: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
    onSuccess: () => {
      setApiCallEnabled(false);
      setAuthenticated(true);
      setApiBearerToken(password);
      setLoggingIn(false);
      localStorage.setItem('pwd', password);
    },
    onError: () => {
      setApiCallEnabled(false);
      setAuthenticated(false);
      setLoggingIn(false);
    },
  });

  return (
    <AuthContext.Provider value={{ login, logout, loggingIn, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
