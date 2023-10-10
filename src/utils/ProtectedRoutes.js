import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let auth = localStorage.getItem("auth_token");
  return auth ? <Outlet /> : <Navigate to="/role" replace />;
};
export default PrivateRoutes;
