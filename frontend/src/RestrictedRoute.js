import { Navigate } from 'react-router-dom';
import { getAuthToken, isAdmin, isUser,isAuthenticated } from './services/BackendService';

const RestrictedRoute = ({ element: Component }) => {
  return isAuthenticated() ? (
    document.referrer !== '' ? (
      <Component />
    ) : (
      <Navigate to="/permission-denied" replace />
    )
  ) : (
  <Navigate to="/login" replace />
  )
};

export default RestrictedRoute;