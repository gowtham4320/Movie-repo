import { Navigate, Outlet } from "react-router-dom";
import Store from "../Redux/Store/Store";

const ProtectLogin = () => {
  return Store.getState().login["result"] || JSON.parse(sessionStorage.getItem("login") ?? "false")? <Outlet /> : <Navigate to="/" />;
};

export default ProtectLogin;
