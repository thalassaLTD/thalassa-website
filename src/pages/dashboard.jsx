import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
import ScoreBoard from "../components/Dashboard/ScoreBoard";
import TopCards from "../components/Dashboard/TopCards";
import AmplitudeEvent from "../components/Amplitude/AmplitudeEvent";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import { getUserId, post } from "../components/Helper";
import Loading from "../components/commonComponents/Loading";
import "../components/Dashboard/dash.css";

// Import videos
import DGD1 from "../components/animations/DGD1.mp4";
import DGD2 from "../components/animations/DGD2.mp4";
import DGD3 from "../components/animations/DGD3.mp4";
import DGD4 from "../components/animations/DGD4.mp4";

export default function Dashboard() {
  AmplitudeEvent("/dashboard-loaded");
  
  const uid = getUserId()
  const reqData = {student_id: uid}
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

  // List of video sources
  const videoSources = [DGD1, DGD2, DGD3, DGD4];

  return (
    <>
      <ResponsiveAppBar />
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          {loading && <Loading />}
          {!loading && <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box height={20} />
            <TopCards scoreboardData={scoreboardData} />

            <Box height={10} />

            <Grid container spacing={2} className="paddingall">
              <Grid item xs={12}>
                <ScoreBoard scoreboardData={scoreboardData?.scorecard} />
              </Grid>

              <Grid item xs={12}>
                <Box>
                  {videoSources.map((source, index) => (
                    <video key={index} width="820" height="840" controls>
                      <source src={source} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>}
        </Box>
      </div>
    </>
  );
}
