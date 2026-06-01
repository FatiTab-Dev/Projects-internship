import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.isAdmin) {
    return <Navigate to="/Login" replace />;
  }
  return <Outlet />;
};