import { Navigate, Outlet } from "react-router-dom";
import Store from "../Redux/Store/Store";

const ProtectLogin = () => {
  return Store.getState().login["result"] ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectLogin;
