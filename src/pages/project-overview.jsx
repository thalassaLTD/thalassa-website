import React, { useState, useEffect } from "react";
import { Box, Paper, Tooltip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";

import projectOverviewJsonData from "../customizeThalassa/pvt-project-overview.json";

export default function Experiments() {
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    paragraphs: [],
    indexOfAnalysisScreenshot: "", // Ensure this key is present
  });

  // Load data from JSON and set it to state
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjectData(projectOverviewJsonData);
      setLoading(false);
    }, 1000); // Simulating loading time
  }, []);

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <div className="bgcolor">

        <Box sx={{ display: "flex", height: "100%" }}>

          <Sidenav />
          {loading && <Loading />}
          {!loading && (
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
              <Paper style={{ padding: 16 }}>

                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <h2 style={{ marginRight: 8 }}>{projectData.title}</h2>
                  {/* <Tooltip title="Overview of the experiements conducted so far." arrow>
                    <IconButton size="small" sx={{ verticalAlign: 'middle', padding: 0 }}>
                      <InfoIcon style={{ marginBottom: 16 }} />
                    </IconButton>
                  </Tooltip> */}
                  
                </Box>

                {/* Render each paragraph */}
                {projectData.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {/* Render the image with responsive styles */}
                <img
                  src={projectData.indexOfAnalysisScreenshot}
                  alt="indexOfAnalysisScreenshot"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Paper>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
