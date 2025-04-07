import {Outlet, Navigate} from 'react-router-dom';

const token: string | null = localStorage.getItem('token');


const ProtectedRoute = () => {
  return token ? <Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute;