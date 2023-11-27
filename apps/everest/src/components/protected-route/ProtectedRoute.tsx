import { AuthContext } from 'contexts/auth';
import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { authenticated } = useContext(AuthContext);

  // At this point, we're pretty much checking the auth state.
  // Later this can be some sort of loading UI
  if (authenticated === null) {
    return <></>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
