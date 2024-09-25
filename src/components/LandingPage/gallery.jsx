import { Image } from "./image";
import React from "react";
import { CssBaseline, Grid, Paper, Typography, createTheme, ThemeProvider } from "@mui/material";

import JsonData from "../../customizeThalassa/websiteData.json";


export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Example Projects</h2>

          <Typography style={{ fontSize: '2rem' }}>
            These case studies illustrate very different situations but share a common thread: A historical system disrupted and fundamentally altered by structural change and external shocks.
            We use data to inform the creation of realistic digital twins to understand the implications of these alterations and shocks to inform decisionmaking in the future structure and conditions.
          </Typography>

        </div>



        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                <div
                  key={`${d.title}-${i}`}
                  className="col-sm-6 col-md-4 col-lg-4 mb-4"
                >
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="card-link">

                    <div className="card p-3">
                      <Image
                        title={d.title}
                        largeImage={d.largeImage}
                        smallImage={d.largeImage}
                      />
                      <div className="card-body">
                        <h4 className="card-title">{d.title}</h4>
                      </div>
                    </div>
                  </a>
                </div>
              ))
              : "Loading..."}
          </div>
        </div>
        <Grid item xs={12} md={12} sx={{ mt: 9 }}>
          <img
            src={JsonData.visionDataModel}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Grid>
      </div>
    </div>
  );
};
