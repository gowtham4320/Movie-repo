import "./Header.styl";
import { Outlet } from "react-router-dom";
//import logo from "../../assets/images/Web capture_5-1-2024_19256_looka.com.png";

export default function Header() {
  return (
    <div className="flex">
      <div className="header title">
        {/* <img src={logo} className="headerLogo" /> */}
        FLIMFLIX
      </div>
      <div className="childPages">
        <Outlet />
      </div>
    </div>
  );
}
