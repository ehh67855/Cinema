import { Navigate } from 'react-router-dom';
import { getAuthToken, isAdmin, isUser,isAuthenticated } from './services/BackendService';

const UserRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
};

export default UserRoute;