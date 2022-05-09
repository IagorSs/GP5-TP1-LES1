
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedRoute ({
  userType,
  children,
}){
  if (userType) {
    return <Navigate to={userType === "ADMIN" ? "/admin":"/user"} replace />;
  }

  return children ? children : <Outlet />;
};