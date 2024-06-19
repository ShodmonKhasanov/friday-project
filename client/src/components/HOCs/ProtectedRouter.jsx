import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRouter({
  children,
  isAllowd,
  redirect = "/",
}) {
  if (!isAllowd) return <Navigate to={redirect} replace />;
  return children || <Outlet />;
}
