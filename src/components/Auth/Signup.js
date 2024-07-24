import React, { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
// import M from 'materialize-css';
import Spinner from "../Spinner/Spinner";
// import firebase from './firebase';
// import firebase from 'firebase/compat/app';
import "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AmplitudeEvent from "../Amplitude/AmplitudeEvent";
import Alert from '@mui/material/Alert';
// import "./Signup.css";
// import Select from 'react-select'

import { AuthContext } from "./Auth";
import SnackbarComponent from "../Alerts/SnackbarComponent";
import { getErrorMessage } from "../Helper";
// import AmplitudeEvent from '../../components/AmplitudeEvent'

const baseURL = "https://api.joinuplyft.com";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/" color="inherit" href="https://uplyft2.netlify.app">
        THALASSA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// export default Signin;
export default function SignUp() {
  AmplitudeEvent("/signup-loaded");

  const history = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [severity, setSeverity] = useState('success')
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const { currentUser } = useContext(AuthContext);
  const find = (event) => {
    // event.preventDefault();
    setRole(event["value"]);
  };

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  const postData = (event) => {
    // if (!name) return M.toast({ html: "Name can't be empty", classes: "#c62828 red darken-3" });
    setLoading(true);
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const auth = getAuth();
        await updateProfile(auth.currentUser, { displayName: name });
        axios
          .post(baseURL + "/studentSignup", {
            googleuid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
          })
          .then((response) => {
          });
        history("/home");
      })
      .catch((e) => {
        setLoading(false);
        const message = getErrorMessage(e);
        setSnackbarMsg(message)
        setSeverity('error')
        setSnackbarOpen(true)
        // M.toast({ html: e.message, classes: "#c62828 red darken-3" });
      });
  };

  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        history("/home");
        alert("Signed in");
        setLoading(false);
        axios
          .post(baseURL + "/studentSignup", {
            googleuid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
          })
          .then((response) => {
            console.log("Axios Sign up data sent", response.data);
          });

        history("/home");
      })
      .catch((e) => {
        setLoading(false);
        // M.toast({ html: e.message, classes: "#c62828 red darken-3" });
      });
  };
  const colourStyles = {
    // control: styles => ({ ...styles, backgroundColor: 'white', fontColor: '#ff0100' }),
    control: (styles) => ({ ...styles, backgroundColor: "#fff585" }),
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
    setSnackbarMsg('')
    setSeverity('success')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
         {snackbarMsg}
        </Alert>
      </Snackbar> */}
        {snackbarOpen && <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg} severity={severity} handleSnackbarClose={handleSnackbarClose} />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={postData} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Agree to T&C"
            /> */}
            <Grid item>
              <Link to="/terms" href="#" variant="body2">
                {"Agree to THALASSA Terms and Condtions"}
              </Link>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={postData}
            >
              Agree & Sign Up
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Typography >or</Typography> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "blueviolet" }}
                onClick={googleAuth}
              >
                Agree & Sign up with google
              </Button>
              <Grid item>
                <Link to="/signin" href="#" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
