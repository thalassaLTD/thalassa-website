import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
// import ScoreBoard from "../components/Dashboard/ScoreBoard";
// import TopCards from "../components/Dashboard/TopCards";
// import AmplitudeEvent from "../components/Amplitude/AmplitudeEvent";
import ResponsiveAppBar from "../components/NavBars/ResNav";
// import { getAuth } from "firebase/auth";
import { getUserId, post } from "../components/Helper";
import Loading from "../components/commonComponents/Loading";
import "../components/Dashboard/dash.css";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default function Dashboard() {
  // AmplitudeEvent("/dashboard-loaded");
  
  const uid = getUserId();
  const reqData = { student_id: uid };
  const [loading, setLoading] = useState(true);
  const [scoreboardData, setScoreboardData] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);
  const [htmlUrls, setHtmlUrls] = useState([]);

  useEffect(() => {
    post("/studentDashboard", reqData)
      .then((response) => {
        setScoreboardData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);  // Ensure loading spinner is stopped on error
      });
  }, []);

  useEffect(() => {
    const storage = getStorage();
    const videoRef = ref(storage, 'Animations/MP4s');

    listAll(videoRef)
      .then((res) => {
        const videoPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
        return Promise.all(videoPromises);
      })
      .then((urls) => setVideoUrls(urls))
      .catch((error) => {
        console.error("Failed to load videos:", error);
      });
      console.log("all videos videoUrls", videoUrls )

  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          {loading && <Loading />}
          {!loading && (
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {/* <Box height={20} /> */}
              {/* <TopCards scoreboardData={scoreboardData} /> */}

              {/* <Box height={10} /> */}

              <Grid container spacing={2} className="paddingall">
                {/* <Grid item xs={12}>
                  <ScoreBoard scoreboardData={scoreboardData?.scorecard} />
                </Grid> */}

                <Grid item xs={12}>
                  
                  <Box>
                    {videoUrls.map((url, index) => (
                      <>
                      <h1>This is the title</h1>
                      <p>This is the description</p>


                      <video key={index} width="820" height="840" controls>
                        <source src={url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      </>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
