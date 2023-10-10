import { Navigate, Outlet } from "react-router-dom";
const LoginCheckRoute = () => {
  let auth = localStorage.getItem("auth_token");
  return auth ? <Navigate to="/FamilyList" /> : <Outlet />;
};
export default LoginCheckRoute;
