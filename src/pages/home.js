import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  CardMedia,
  CardHeader,
  CardContent,
  Divider,
  Card
} from "@mui/material";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Facebook as FacebookIcon } from "../icons/facebook";
// import { Google as GoogleIcon } from "../icons/google";
import { LoginRequest } from "../services/index.js";
import { setAuthToken } from "../services/config";
import { useEffect } from "react";
import { setOrgDetails } from "../store/actions";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const Login = () => {
  const slideImages = [
    {
      url: '/static/images/fi-brand-assets-bug.drawio.png',
      caption: 'Slide 1'
    },
    {
      url: '/static/images/LogoTheme.png',
      caption: 'Slide 2'
    },
    {
      url: '/static/images/LogoTheme.png',
      caption: 'Slide 3'
    },
  ];


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      username: "roundpier",
      password: "roundpier",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const { jwt, orgDetails } = await LoginRequest(values, navigate);
      if (jwt) {
        dispatch({ type: "LOGIN", jwt });
        setAuthToken(jwt);
        localStorage.setItem("JWT", jwt);
        dispatch(setOrgDetails(orgDetails));
        navigate("dashboard");
      }
    },
  });
  useEffect(() => {
    if (auth.JWT) {
      navigate("dashboard");
    }
  }, []);
  return (
    <>

      {/* sx={{
        position: "fixed"
       }} */}

      <Grid container spacing={2}
        sx={{
          position: "fixed",
          top: 0,
          height: 150,
          // margin :10,
        }}
      >
        <Grid item xs={6}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "#F9FAFC",
            color: "black",
            borderColor: "red",
            // height: 150,
            // marginLeft : 20,
          }}>
          <img src='/static/images/LogoTheme.png' width='250' margin-left="10px" />
        </Grid>
        <Grid item xs={6}
          sx={{
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "#F9FAFC",
            color: "black",

          }}>
          <Container >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                error={Boolean(formik.touched.username && formik.errors.username)}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Username"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // type="email"
                value={formik.values.username}
                variant="outlined"
                sx={{ width: '30%', m: 2 }}
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                sx={{ width: '30%' }}
              />
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: '30%', m: 2, my: 2, height: '55px' }}
              >
                Sign In Now
              </Button>
            </form>
          </Container>
        </Grid>
      </Grid>
      <Grid container spacing={2}
        sx={{
          alignItems: "center",
          textAlign: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          // backgroundColor: "#1D5E77",
          color: "white",
          height: 200,
        }}>

      </Grid>


      <Grid container spacing={2}
        sx={{
          alignItems: "center",
          textAlign: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          backgroundColor: "#1D5E77",
          color: "white",
          height: 400,
          // marginTop:20
        }}>

        <Grid item xs={6}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "#1D5E77",
            color: "white",
            height: 400,
          }}>



          <CardContent>
            <Grid container spacing={3}>
              <Typography variant="h2"
                sx={{
                  display: "flex",
                  p: 2,
                  mt: 2
                }}
              >
                Understanding your customer begins here
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5"
                sx={{
                  display: "flex",
                  p: 2,
                  mt: 2,
                  ml: 2
                }}
              >
                An AI based tool to automatically filter bugs, issues and topic wise segregation
              </Typography>
            </Grid>
          </CardContent>


        </Grid>
        <Grid item xs={6}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "white",
            color: "black",
            borderColor: "red",
            height: 400,
          }}>

          <video height="400" width="100%" autoPlay muted loop src="/static/images/output_PkawWw.mp4">
          </video>

        </Grid>
        <Grid item xs={6}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            // content: "fit",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "white",
            color: "black",
            borderColor: "red",
            height: 400,

          }}>
          <CardContent>
            <img src='/static/images/fi-brand-assets-Sourcesdata.drawio.png' width='500' />

          </CardContent>

        </Grid>

        <Grid item xs={6}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "#1D5E77",
            color: "white",
            borderColor: "red",
            height: 400,
          }}>
          <Typography variant="h4">
            A single platform for all your feedback data to slice and dice through
          </Typography>
        </Grid>

        <Grid item xs={6}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "#1D5E77",
            color: "white",
            height: 400,
          }}>
          <Typography variant="h4">
            Losing touch with customers happens too slowly to notice unitil it's too late to respond
          </Typography>


        </Grid>
        <Grid item xs={6}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            // backgroundColor: "#1D5E77",
            color: "white",
            height: 400,
          }}>

          <Card sx={{ mr: 2, p: 5, color: "#1D5E77", }}>

            <Typography sx={{ m: 0 }} variant="h4">
              What Thalassa solves?
            </Typography>

            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography variant="h5">
                    Bug Detection
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h5">
                    Topic based segregation
                  </Typography>

                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h5">
                    Alerts on issues
                  </Typography>

                </Grid>

                <Grid item md={6} xs={12}>
                  <Typography variant="h5">
                    Recommendations from customers
                  </Typography>

                </Grid>

              </Grid>
            </CardContent>
            <Typography variant="h5">
              And much more..
            </Typography>

          </Card>
        </Grid>

        <Grid item xs={12}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "white",
            color: "black",
            borderColor: "red",
            height: 400,
          }}>
          <Grid item lg={12} md={6} xs={12}>
            <Card>
              <CardHeader
                title="Contact US"
              // subheader="The information can be edited"
              />
              {/* <Divider /> */}


              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="p">
                      email : info@thalassa.com
                    </Typography>



                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="p">
                      phone : +44 7467406061(UK)
                    </Typography>

                  </Grid>

                </Grid>
              </CardContent>
              {/* <Divider /> */}
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  p: 2,
                }}
              >
                
              </Box> */}
            </Card>
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};

export default Login;

