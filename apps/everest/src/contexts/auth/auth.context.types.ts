export interface AuthContextProps {
  login: (password: string) => void;
  logout: () => void;
  loggingIn: boolean;
  authenticated: boolean | null;
}
