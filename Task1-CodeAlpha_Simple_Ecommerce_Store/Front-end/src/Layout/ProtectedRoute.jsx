import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || (!user.isAdmin && user.role !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
