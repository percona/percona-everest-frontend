export type UserAuthStatus =
  | 'loggingIn'
  | 'loggingOut'
  | 'loggedIn'
  | 'loggedOut'
  | 'unknown';

export interface AuthContextProps {
  login: (password: string) => void;
  logout: () => void;
  setRedirectRoute: (route: string) => void;
  authStatus: UserAuthStatus;
  setAuthStatus: (status: UserAuthStatus) => void;
  redirectRoute: string | null;
}
