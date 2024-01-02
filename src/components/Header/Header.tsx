import "./Header.styl";
import { Outlet } from "react-router-dom";
export default function Header() {
  return (
    <div className="flex">
      <div className="header title">FLIMFLIX</div>
      <div className="childPages">
        <Outlet />
      </div>
    </div>
  );
}
