import { AuthContext } from 'contexts/auth';
import { ReactNode, useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const location = useLocation();
  const { authStatus, setRedirectRoute } = useContext(AuthContext);

  useEffect(() => {
    // We initially save the location
    // If the user is logged out and then logs in, we take them back
    if (authStatus === 'unknown') {
      setRedirectRoute(location.pathname);
    }
  }, [authStatus]);

  // At this point, we're pretty much checking the auth state.
  // Later this can be some sort of loading UI
  if (authStatus === 'unknown') {
    return <></>;
  }

  if (authStatus === 'loggedOut') {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
