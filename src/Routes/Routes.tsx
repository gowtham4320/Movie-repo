import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "../Pages/Login/login";
import Home from "../Pages/Home/Home";
import * as React from "react";
import Header from "../Pages/Header/Header";
import { useAppDispatch } from "../Redux/Store/Hooks";
import { logoutAction } from "../Redux/Actions/Login/loginActions";
import ProtectLogin from "./PrivateRoute";

export default function AppRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    window.addEventListener("beforeunload", () => {});
    if (location.pathname === "/") {
      dispatch(logoutAction());
      sessionStorage.removeItem("login")
      navigate("/", { replace: true, state: { clearHistory: true } });
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<ProtectLogin />}> */}
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Home />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}
