import React, { useState, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
// import M from 'materialize-css';
import Spinner from '../Spinner/Spinner';
import firebase from './firebase';
import { AuthContext } from './Auth';
import { useStateValue } from '../../state/Provider'
import { actionTypes } from '../../state/reducer'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import "./Signup.css";

import AmplitudeEvent from '../Amplitude/AmplitudeEvent'
import SnackbarComponent from '../Alerts/SnackbarComponent';
import { getErrorMessage } from '../Helper';
import axios from 'axios'

const baseURL = "https://api.joinuplyft.com";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" color="inherit" href="https://uplyft2.netlify.app">
        THALASSA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// export default Signin;
export default function SignIn() {
  AmplitudeEvent("/signin-loaded");


  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [severity, setSeverity] = useState('success')

  // const [state, dispatch] = useStateValue();


  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const postData = (event) => {
    setLoading(true);
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        console.log(user)
        history("/home");
        setLoading(false);
        // M.toast({ html: 'Successfully Signed In!', classes: "#43a047 green darken-1" });
        history("/home");
      })
      .catch(e => {
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
      .then(result => {
        console.log(result);
        updateProfile(auth.currentUser, { displayName: result.user.displayName, });
        axios
          .post(baseURL + "/studentSignup", {
            googleuid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
          })
          .then((response) => {
          });
        // alert("Signed in")
        history("/home");
        result.user.updateProfile({
          displayName: result.user.displayName
        })
        // setLoading(false);
        alert("Signed in")
        history("/home");
      })
      .catch(e => {
        setLoading(false);
        const message = getErrorMessage(e);
        setSnackbarMsg(message)
        setSeverity('error')
        setSnackbarOpen(true)
      });
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
    setSnackbarMsg('')
    setSeverity('success')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {snackbarOpen && <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg} severity={severity} handleSnackbarClose={handleSnackbarClose} />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={postData}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Typography>
                or
              </Typography> */}

              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "blueviolet" }}
                onClick={googleAuth}
              >
                Sign in with google
              </Button> */}
              {/* <Grid item>
                <Link to="/signup" href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}