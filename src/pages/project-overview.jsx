import React, { useState, useEffect } from "react";
import { Box, Paper, Tooltip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";

import projectOverviewJsonData from "../customizeThalassa/pvt-project-overview.json";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export default function Experiments() {
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    paragraphs: [],
    indexOfAnalysisScreenshot: "", // Ensure this key is present
  });
  const [imageUrl, setImageUrl] = useState(null); // State to hold the image URL

  // Load data from JSON and set it to state
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjectData(projectOverviewJsonData);
      setLoading(false);
    }, 1000); // Simulating loading time
  }, []);

  // Fetch image from Firebase Storage
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const storage = getStorage(); // Initialize Firebase Storage
        const imageRef = ref(storage, "/Other Assets/indexOfAnalysisScreenshot.jpg"); // Reference to the image file
        const url = await getDownloadURL(imageRef); // Get download URL
        setImageUrl(url); // Set the image URL to state
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
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
                  {/* Tooltip and InfoIcon can be added back if needed */}
                </Box>

                {/* Render each paragraph */}
                {projectData.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {/* Render the image if the URL is available */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="indexOfAnalysisScreenshot"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}
              </Paper>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
