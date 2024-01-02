import { Navigate, Outlet } from "react-router-dom";
import Store from "../Redux/Store/Store";

const ProtectLogin = () => {
  return Store.getState().login ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectLogin;
