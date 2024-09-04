import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";

import projectOverviewJsonData from "../customizeThalassa/pvt-project-overview.json";

export default function Experiments() {
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    paragraphs: [],
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
      <ResponsiveAppBar />
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          {loading && <Loading />}
          {!loading && (
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Box height={20} />
              <Box height={10} />

              {/* Render the title */}
              <h1>{projectData.title}</h1>

              {/* Render each paragraph */}
              {projectData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
