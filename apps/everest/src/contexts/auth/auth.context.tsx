import { createContext } from 'react';
import { AuthContextProps } from './auth.context.types';

const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  loggingIn: false,
  authenticated: null,
});

export default AuthContext;
