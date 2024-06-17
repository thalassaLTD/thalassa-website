import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  ListItem,
  useMediaQuery,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { User as UserIcon } from "../icons/user";
import StarRateIcon from "@mui/icons-material/StarRate";
import TopicIcon from "@mui/icons-material/Topic";
import BugReportIcon from "@mui/icons-material/BugReport";
import { NavItem } from "./nav-item";
import Logout from "./logout";
import Popover from "@mui/material/Popover";

const items = [
  {
    href: "/dashboard",
    icon: <StarRateIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/bugs",
    icon: <BugReportIcon fontSize="small" />,
    title: "Bugs",
  },
  {
    href: "/reviews",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Reviews",
  },
  {
    href: "/custom-topics",
    icon: <TopicIcon fontSize="small" />,
    title: "Custom Topics",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  // {
  //   href: "/settings",
  //   icon: <CogIcon fontSize="small" />,
  //   title: "Settings",
  // },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", height: "64px" }}>
          <Box sx={{ pt: 0, pl: 2, pb: 0, display: "flex" }}>
            <IconButton onClick={() => onClose(!open)}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box sx={{ p: 3 }}>
          <Typography
            color="neutral.500"
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Terms and Conditions of usage
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
