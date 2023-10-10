import { Navigate, Outlet } from "react-router-dom";

const CheckDashboard = () => {
  let auth = localStorage.getItem("auth_token");
  let dashboard = localStorage.getItem("dashboard_process");
  return auth && dashboard == 1 ? <Outlet /> : <Navigate to="/" replace />;
};
export default CheckDashboard;
