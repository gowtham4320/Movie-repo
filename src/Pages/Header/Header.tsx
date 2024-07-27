import { Avatar, Button } from "@mui/material";
import "./Header.styl";
import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex">
      <div className="header">
        <div className="title">FLIMFLIX</div>
        {/* <div className="signin-button">
          <Avatar/>
        </div> */}
      </div>
      <div className="childPages">
        <Outlet />
      </div>
    </div>
  );
}
