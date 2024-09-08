import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/WorkOutline";
import PlayGround from "@mui/icons-material/PlayArrow";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MapIcon from "@mui/icons-material/Map";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toolbar from "@mui/material/Toolbar";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import FactoryIcon from "@mui/icons-material/Factory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "./appStore";
import { getAuth, signOut } from "firebase/auth";

// import Home from "../../pages/animations";
import { Grid } from "@mui/material";
import Confirmation from "../Alerts/Confirmation";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const open = useAppStore((state) => state.dopen);
  const auth = getAuth();
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleLogout = () => {
    setOpenConfirm(false);
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Confirmation
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        confirmAction={handleLogout}
        message={"Are you sure you want to logout?"}
      />
      <Drawer
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#123860",
            pt: "3.5rem",
          },
        }}
        variant="permanent"
        open={open}
      >
        {/* <DrawerHeader style={{marginTop:-2}}/> */}
        {open ? (
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
          >
            <Grid item xs={9}>
              <Typography
                variant="h5"
                padding="15%"
                sx={{
                  display: { xs: "none", sm: "block" },
                  backgroundColor: "#123860",
                  color: open ? "#fff" : "#123860",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/animations")}
              >
                THALASSA
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="large"
                // edge="start"
                aria-label="open drawer"
                sx={{
                  // pb: 8,
                  // backgroundColor: "#123860",
                  color: "#fff",
                  borderRadius: "0px",
                  // pl: open ? '80%': "default",
                  "&:hover": {
                    // backgroundColor: "#123860",
                    color: "#fff",
                    border: "1px #fff",
                  },
                }}
                onClick={() => updateOpen(!dopen)}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : (
          <IconButton
            size="large"
            // edge="start"
            aria-label="open drawer"
            sx={{
              mt: 3,
              // pb: 8,
              // backgroundColor: "#123860",
              color: "#fff",
              borderRadius: "0px",
              // pl: open ? '80%': "default",
              "&:hover": {
                // backgroundColor: "#123860",
                color: "#fff",
                border: "1px #fff",
              },
            }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
        )}
        {/* <Divider /> */}
        <List
          sx={{ height: 100 + "vh", backgroundColor: "#123860", color: "#fff" }}
        >
          {/* <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/animations");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <HomeIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></HomeIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/project-overview");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <BarChartIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></BarChartIcon>
              <ListItemText primary="Project Overview" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>


          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/animations");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <VideoLibraryIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></VideoLibraryIcon>
              <ListItemText
                primary="Temporal Animations"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/spatial-analytics");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <RoomOutlinedIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></RoomOutlinedIcon>
              <ListItemText primary="Spatial Analysis" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/playground");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <PlayGround
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></PlayGround>
              <ListItemText primary="Playground" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <Divider
            orientation="horizontal"
            sx={{ my: "1rem", borderColor: "#3d5873", width: "100%" }}
          />
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/account");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <PersonIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></PersonIcon>
              <ListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setOpenConfirm(true)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <LogoutIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></LogoutIcon>
              <ListItemText primary="Log Out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
