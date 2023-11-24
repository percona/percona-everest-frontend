import { AuthContext } from 'contexts/auth/auth.context';
import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { authenticated } = useContext(AuthContext);

  if (authenticated === null) {
    return <></>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
