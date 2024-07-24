import React from 'react';
import { CssBaseline, Grid, Paper, Typography, createTheme, ThemeProvider } from "@mui/material";

const caseStudies = [
  {
    title: "AI-Driven Marketing Optimization",
    largeImage: "img/portfolio/01.large.jpg",
    smallImage: "img/portfolio/01.small.jpg",
    description: "For a leading retail company, we implemented AI-driven marketing solutions that increased their ROI by 40%. Our system analyzed customer data, optimized ad targeting, and provided actionable insights, resulting in more effective marketing campaigns."
  },
  {
    title: "Custom Software Solutions",
    largeImage: "img/portfolio/02.large.jpeg",
    smallImage: "img/portfolio/02.small.jpeg",
    description: "We developed a custom software platform for a logistics company, streamlining their operations and enhancing real-time tracking capabilities. This solution improved delivery efficiency by 30% and reduced operational costs."
  },
  {
    title: "AI-Powered Design Insights",
    largeImage: "img/portfolio/03-large.jpg",
    smallImage: "img/portfolio/03-small.jpg",
    description: "Our AI-powered design tool helped a fashion brand understand consumer preferences and design trends. By leveraging our insights, they launched a new clothing line that saw a 25% increase in sales."
  },
  {
    title: "Social Media Analytics",
    largeImage: "img/portfolio/04.large.jpg",
    smallImage: "img/portfolio/04.small.jpg",
    description: "A global beverage company used our social media analytics services to monitor brand sentiment and engagement. This allowed them to fine-tune their social media strategy, leading to a 50% increase in positive brand mentions."
  },
  {
    title: "Advanced Data Analytics Implementation",
    largeImage: "img/portfolio/05.large.jpg",
    smallImage: "img/portfolio/05.small.jpg",
    description: "For a financial services firm, we implemented advanced data analytics to predict market trends and optimize investment strategies. This resulted in a 20% improvement in portfolio performance."
  },
  {
    title: "Scalable Web Development",
    largeImage: "img/portfolio/06-large.jpg",
    smallImage: "img/portfolio/06-small.jpg",
    description: "We developed a scalable web platform for an e-learning company, accommodating their growing user base and providing a seamless learning experience. User engagement increased by 35% post-launch."
  },
  {
    title: "Content Optimization Using AI",
    largeImage: "img/portfolio/07-large.jpg",
    smallImage: "img/portfolio/07-small.jpg",
    description: "Our AI-driven content optimization tools helped a media company enhance their content strategy. By analyzing audience behavior, they increased content relevance and saw a 30% boost in reader engagement."
  },
  {
    title: "AI-Enhanced Project Management",
    largeImage: "img/portfolio/08-large.jpg",
    smallImage: "img/portfolio/08-small.jpg",
    description: "A construction firm leveraged our AI-enhanced project management solution to streamline their project timelines and resource allocation. This led to a 25% reduction in project completion times."
  },
  {
    title: "E-commerce Data Insights",
    largeImage: "img/portfolio/09-large.jpg",
    smallImage: "img/portfolio/09-small.jpg",
    description: "We provided an e-commerce retailer with data insights that transformed their customer experience. Our solutions helped personalize shopping experiences, leading to a 15% increase in conversion rates."
  }
];

const theme = createTheme();

const CaseStudies = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                  <Typography variant="body1">{caseStudy.description}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default CaseStudies;
