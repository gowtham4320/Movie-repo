import { Avatar, Backdrop, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import "./Header.styl";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Hooks";
import { logoutAction } from "../../Redux/Actions/Login/loginActions";

export default function Header() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { result } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();



  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    dispatch(logoutAction());
    sessionStorage.removeItem("login")
    navigate("/login", { replace: true, state: { clearHistory: true } });
  }

  return (
    <div className="flex">
      <div className="header">
        <div className="title">FLIMFLIX</div>
        <div className="signin-button">
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Backdrop
              sx={(theme) => ({ color: '#fff', zIndex: 10 })}
              open={!result}
              onClick={handleClose}
            >
              <Button sx={{ zIndex: "10" }} onClick={() => { navigate("/login") }} variant="contained" color="secondary"> Login </Button>
            </Backdrop>

            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="childPages">
        <Outlet />
      </div>
    </div>
  );
}
