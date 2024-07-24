import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { Avatar } from "@mui/material";
import { getCurrentUser } from "../../components/Helper";


// const pages = ["Products"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const currentUser = getCurrentUser();
  const photoUrl = currentUser?.photoURL;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ height: "70px",backgroundColor:"transparent",border:'none',boxShadow:'none'}}>
    {currentUser && <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin:'10px',
        }}
      >
        <Avatar src={photoUrl} sx={{ width: 50, height: 50, marginRight: 1,border:'0.1px solid white'}} />
        <Typography variant="h6" color="#000">
          {getCurrentUser()?.displayName}
        </Typography>
      </div>}
    </AppBar>
  );
}
export default ResponsiveAppBar;