import React from 'react';
import { CssBaseline, Grid, Paper, Typography, createTheme, ThemeProvider } from "@mui/material";
import { Navigation } from "../components/LandingPage/navigation";
import { Header } from "../components/LandingPage/header";

const caseStudies = [
  {
    "title": "New Vaccine Impact on Fish Farms",
    "largeImage": "https://media.cnn.com/api/v1/images/stellar/prod/230817230825-covid-vaccine-arm-wellness.jpg?c=16x9&q=h_833,w_1480,c_fill",
    "smallImage": "img/portfolio/case1_small.jpg"
  },
  {
    "title": "Exploratory Modelling of Depression",
    "largeImage": "https://thalassa.ltd/static/images/ABMmodelimage.png",
    "smallImage": "img/portfolio/case2_small.jpeg"
  },
  {
    "title": "Solar Energy and Retail Integration",
    "largeImage": "https://aemo.com.au/-/media/images/site-assets/promo-tiles/renewables-square.jpg?h=1414&la=en&w=1417&hash=30144ECF443CFDCBEE6544700759176C",
    "smallImage": "img/portfolio/case3_small.jpg"
  },
  {
    "title": "Localization of COVID-19 Models",
    "largeImage": "https://images-provider.frontiersin.org/api/ipx/w=1200&f=png/https://www.frontiersin.org/files/Articles/566853/frcmn-01-566853-HTML-r1/image_m/frcmn-01-566853-g001.jpg",
    "smallImage": "img/portfolio/case4_small.jpg"
  }
];

const theme = createTheme();

const CaseStudies = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="website-page">
        <Navigation />
        <br></br>
        <br></br>
        <br></br>
        <Grid container spacing={4} style={{ padding: 24 }}>
          {caseStudies.map((caseStudy, index) => (
            <Grid item xs={12} key={index}>
              <Paper style={{ padding: 16 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <img src={caseStudy.largeImage} alt={caseStudy.title} style={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>{caseStudy.title}</Typography>
                    <Typography variant="body1">
                      This is a brief description of the {caseStudy.title.toLowerCase()}. It highlights the key aspects and outcomes of the project, providing insights into how our solutions helped achieve the desired results.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </div>
      <CssBaseline />

    </ThemeProvider>
  );
};

export default CaseStudies;
