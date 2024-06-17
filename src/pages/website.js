import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography, CardMedia, CardHeader, CardContent, Divider, Card } from "@mui/material";
import { LoginRequest } from "../services/index.js";
import { setAuthToken } from "../services/config.js";
import { useEffect } from "react";
import { setOrgDetails } from "../store/actions/index.js";
import { BorderAllRounded } from "@mui/icons-material";

import Navigation from '../pages/navigation.js';


const Website = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (auth.JWT) {
      navigate("dashboard");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values.email);
    },
  });

  return (
    <>

      {/* <div style={{ background: "linear-gradient(to bottom right, #4CAF50, white 50%, #F9FAFC, #4CAF50)", minHeight: "20vh" }}> */}
      <div style={{ minHeight: "20vh" }}>
        <Grid container spacing={2} sx={{ position: "fixed", top: 0, height: 80 }}>
          <Grid item xs={12} md={6} sx={{ alignItems: "center", textAlign: "center", display: "flex", flexGrow: 0, backgroundColor: "#F9FAFC", color: "black", borderColor: "red" }}>
            <Box sx={{ marginLeft: "12%" }}>
              <img src="/static/images/LogoTheme.png" width="220" alt="Logo" />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ alignItems: "center", alignContent: "center", flexGrow: 0, backgroundColor: "#F9FAFC", color: "black" }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: '12%', mt: '2%', backgroundColor: "pink" }}>
              <Button component={Link} to="/home" color="inherit">Home</Button>
              <Button component={Link} to="/about" color="inherit">Localisation</Button>
              <Button component={Link} to="/about" color="inherit">	Machine learning</Button>
              <Button component={Link} to="/about" color="inherit">Consulting</Button>
              <Button component={Link} to="/services" color="inherit">About Us</Button>
            </Box>
          </Grid>
        </Grid>;



        <Grid container spacing={2} sx={{ alignItems: "center", textAlign: "center", display: "flex", flexGrow: 1, minHeight: "100%", color: "white", height: 200 }}></Grid>
        <Grid>
          <Grid item xs={12} md={12} sx={{ alignItems: "center", textAlign: "center", minHeight: "100%", color: "white", borderColor: "red" }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h1" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1D5E77' }}>Dynamic Modeling Solutions</Typography>
                  <Typography variant="h3" sx={{ textAlign: 'center', color: 'black' }}>Harnessing Data for Insights</Typography>
                  <Typography variant="h6" sx={{ textAlign: 'center', color: '#333' }}>Empowering decision-making through dynamic modeling in various domains.</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>

        </Grid>
      </div>
      <Grid container spacing={2} sx={{ p: 10 }}>
        <Grid item xs={12} md={6} sx={{}}>
          <img src="/static/images/covid.png" alt="COVID Modeling" style={{ width: "100%", height: "auto", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }} />
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: "center", margin: "auto" }}>
          <Typography variant="h4" gutterBottom>COVID-19 Dynamic Modeling</Typography>
          <Typography variant="body1">Utilize sophisticated models to forecast and analyze the spread of COVID-19, aiding in public health decision-making.</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ p: 10 }}>
        <Grid item xs={12} md={4} style={{ textAlign: "center", margin: "auto" }}>
          <Typography variant="h4" gutterBottom>Aquaculture Dynamics</Typography>
          <Typography variant="body1">Optimize aquaculture processes through dynamic modeling, enhancing efficiency and sustainability in seafood production.</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{}}>
          <img src="/static/images/aqua.png" alt="Aquaculture Modeling" style={{ width: "80%", height: "auto", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }} />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ p: 10 }}>
        <Grid item xs={12} md={6} sx={{}}>
          <img src="/static/images/electricity.png" alt="Electricity Modeling" style={{ width: "80%", height: "auto", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }} />
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: "center", margin: "auto" }}>
          <Typography variant="h4" gutterBottom>Business disruption Modeling</Typography>
          <Typography variant="body1">Predict and manage Business disruption fluctuations with precision using dynamic modeling, ensuring stable supply.</Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" sx={{}}>
        <Typography variant="h3" color="textSecondary" sx={{ fontWeight: 'bold' }}>Dynamic Modeling Solutions</Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="paragraph" color="textSecondary" sx={{ fontWeight: 'bold' }}>Empowering Decision-Making Through Data</Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h6" color="textSecondary" sx={{ p: 5 }}>Contact us for a demo: mglucksman@thalassa.ltd</Typography>
        <Typography variant="h6" color="textSecondary" sx={{ p: 5 }}>Phone: +44 7768 773965</Typography>
      </Grid>
      <Grid style={{ color: "#fff", textAlign: "center", margin: "auto", backgroundColor: "black" }}>
        <Typography variant="body2">© 2024 Dynamic Modeling Solutions.</Typography>
      </Grid>
    </>
  );
};

export default Website;
