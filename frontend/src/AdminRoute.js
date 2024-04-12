import { Navigate } from 'react-router-dom';
import { getAuthToken, isAdmin } from './services/BackendService';

const AdminRoute = ({ element: Component }) => {
  return isAdmin(getAuthToken()) ? <Component /> : <Navigate to="/permission-denied" replace />;
};

export default AdminRoute;