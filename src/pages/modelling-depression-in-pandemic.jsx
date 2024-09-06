import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, Paper, Typography, createTheme, ThemeProvider, Button } from "@mui/material";
import { Navigation } from "../components/LandingPage/navigation";
import { Header } from "../components/LandingPage/header";

import JsonData from "../customizeThalassa/modelling-depression-in-pandemic.json";


const theme = createTheme();

const NewVaccineImpactOnFishFarms = () => {

  const [caseStudiesData, setCaseStudies] = useState([]);

  useEffect(() => {
    setCaseStudies(JsonData.CaseStudies);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="website-page">
        <Navigation />
        <br></br>
        <br></br>
        <br></br>
        <Grid container spacing={4} style={{ padding: 24 }}>
          {caseStudiesData.map((caseStudy, index) => (
            <Grid item xs={12} key={index}>

              <Paper style={{ padding: 16 }}>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <img
                      src={caseStudy.largeImage1}
                      alt={caseStudy.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '500px', // Set a maximum height for the banner
                        objectFit: 'cover', // Ensure the image covers the entire width without distortion
                        objectPosition: 'center', // Center the image within the container
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <img
                      src={caseStudy.largeImage2}
                      alt={caseStudy.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '500px', // Set a maximum height for the banner
                        objectFit: 'cover', // Ensure the image covers the entire width without distortion
                        objectPosition: 'center', // Center the image within the container
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} md={4}>
                    <img src={caseStudy.largeImage} alt={caseStudy.title} style={{ width: '100%' }} />
                  </Grid> */}

                  <Grid item xs={12} md={8}>
                    <Typography variant="h2" gutterBottom>{caseStudy.title}</Typography>

                    <Typography variant="body1">
                      {caseStudy.paragraph}
                    </Typography>
                  </Grid>
                </Grid>

                <Button >
                  Sign In
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </div>
      <CssBaseline />

    </ThemeProvider>
  );
};

export default NewVaccineImpactOnFishFarms;
