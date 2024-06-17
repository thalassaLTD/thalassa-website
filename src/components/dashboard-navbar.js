import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Menu,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { useSelector } from "react-redux";
import { Popover, Typography, ListItem, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutDailog from "./logout";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { data } = useSelector(({ orgDetails }) => orgDetails);
  const [showLogout, setLogoutOpen] = useState(false);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "logout-button" : undefined;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          {/* <Box sx={{ pt: 0,  pb: 0, display: "flex" }}>
          <img src='/static/images/fi-brand-assets-Logo White.drawio.png' height='50px' />
          </Box> */}
          {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              cursor: "pointer",
            }}
            src={data?.logo}
            onClick={handleProfileClick}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
          <Menu
            id={id}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              display: { xs: "block" },
              mt: "40px",
            }}
          >
            <Button
              component="a"
              onClick={() => setLogoutOpen(true)}
              startIcon={<LogoutIcon />}
              disableRipple
              sx={{
                // backgroundColor: active && 'rgba(255,255,255, 0.08)',
                borderRadius: 1,
                color: "#000",
                // fontWeight: active && 'fontWeightBold',
                justifyContent: "flex-start",
                px: 3,
                textAlign: "left",
                textTransform: "none",
                width: "100%",
                "& svg": {
                  color: theme.palette.primary.main,
                },
                "& .MuiButton-startIcon": {
                  color: "neutral.400",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255, 0.08)",
                },
              }}
            >
              Logout
            </Button>
          </Menu>
        </Toolbar>
        <LogoutDailog open={showLogout} onClose={() => setLogoutOpen(false)} />
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
