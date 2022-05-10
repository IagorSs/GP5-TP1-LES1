
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';

export default function NotLoggedRoute ({
  children,
}){
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={user.Permission === "client" ? "/menu":"/admin"} replace />;
  }

  return children ? children : <Outlet />;
};