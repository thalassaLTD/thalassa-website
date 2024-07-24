import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Sidenav from "../components/NavBars/Sidenav";
import ScoreBoard from "../components/Dashboard/ScoreBoard";
import TopCards from "../components/Dashboard/TopCards";
import Immersions from "../components/Dashboard/Immersions";

import "../components/Dashboard/dash.css";

import AmplitudeEvent from "../components/Amplitude/AmplitudeEvent";
import { Paper, Typography } from "@mui/material";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import { getUserId, post } from "../components/Helper";
import Loading from "../components/commonComponents/Loading";

export default function Dashboard() {
  AmplitudeEvent("/dashboard-loaded");
  
  const uid = getUserId()
  const reqData = {student_id : uid}
  const [loading, setLoading] = useState(true);
  const [scoreboardData, setScoreboardData] = useState(null);

  React.useEffect(() => {
    post("/studentDashboard", reqData)
      .then((response) => {
        setScoreboardData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          {loading && <Loading/>}
          {!loading && <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box height={20} />
            {/* <Paper>
              <Typography
                color="#123860"
                sx={{ p: 3, py: 2, fontWeight: 600 }}
                variant="h5"
              >
                Dashboard
              </Typography>
            </Paper> */}
            <TopCards scoreboardData={scoreboardData}/>

            <Box height={10} />

            <Grid container spacing={2} className="paddingall">
              <Grid item xs={12}>
                <ScoreBoard scoreboardData={scoreboardData.scorecard}/>
              </Grid>
              {/* <Grid item xs={12} md={8}>
                <Immersions />
              </Grid> */}
            </Grid>
            {/* <Grid container height={'100%'}>
              <Grid item p={3} xs={8} >
                <Paper sx={{borderRadius:4,background:'#fff',p:3}} >
                <TopCards />
                </Paper>

              </Grid>
              <Grid item xs={4}>
                
              </Grid>
            </Grid> */}
          </Box>}
        </Box>
      </div>
    </>
  );
}
