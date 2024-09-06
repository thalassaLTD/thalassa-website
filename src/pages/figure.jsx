import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../components/Auth/Auth';
import Sidenav from '../components/NavBars/Sidenav';
import { Box } from '@mui/material';
import ResponsiveAppBar from "../components/NavBars/ResNav";

function Figure() {
  const { type, folder, id } = useParams(); // Extracting type, folder, and id from URL
  const { currentUser } = useContext(AuthContext);
  const [videoUrl, setVideoUrl] = useState(null); // State to store the video URL
  const storage = getStorage(); // Get Firebase Storage instance

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        // Constructing the path to the video file in Firebase Storage
        const videoPath = `/Experiments/${type}/${folder}/${id}`;
        const videoRef = ref(storage, videoPath);
        
        // Fetching the download URL for the video
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url); // Set the video URL to state
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    if (type && folder && id) {
      fetchVideoUrl(); // Fetch video URL when type, folder, and id are available
    }
  }, [type, folder, id, storage]);

  return (
    <>
      {currentUser?.uid && <ResponsiveAppBar />}
      <Box sx={{ display: "flex", height: "100%" }}>
        {currentUser?.uid && <Sidenav />}
        <Box component="main" sx={{ flexGrow: 1, height: "100%", textAlign: "center" }}>
          <h1>Video: {id}</h1>

          {/* Check if video URL is available and display the video */}
          {videoUrl ? (
            <video width="80%" height="auto" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Loading video...</p>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Figure;
