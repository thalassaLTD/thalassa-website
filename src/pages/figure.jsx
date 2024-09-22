import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate for redirection
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { AuthContext } from '../components/Auth/Auth';
import Sidenav from '../components/NavBars/Sidenav';
import { Box } from '@mui/material';
import ResponsiveAppBar from "../components/NavBars/ResNav";
import { useLocation } from 'react-router-dom';


export default function Figure() {
    // const { type, folder, id } = useParams(); // Extracting type, folder, and id from URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    const type = queryParams.get('type');
    const area = queryParams.get('area');
    const folder = queryParams.get('folder');
    const id = queryParams.get('id');

    // const { currentUser } = useContext(AuthContext); // Get currentUser from AuthContext
    const [videoUrl, setVideoUrl] = useState(null); // State to store the video URL
    const navigate = useNavigate(); // useNavigate hook for redirection
    const storage = getStorage(); // Get Firebase Storage instance

    // console.log("currentUser, ", currentUser)

    // // Check if user is authenticated, redirect to sign-in if not
    // useEffect(() => {
    //     console.log("currentUser, ", currentUser)
    //     if (!currentUser?.uid) {
    //         navigate('/signin'); // Redirect to the sign-in page if not signed in
    //     }
    // }, [currentUser, navigate]);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                // Constructing the path to the video file in Firebase Storage
                const videoPath = `/Experiments/${type}/${area}/${folder}/${id}`;
                console.log(type, folder, id, `/Experiments/${type}/${area}/${folder}/${id}`)
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
            <ResponsiveAppBar />
            <Box sx={{ display: "flex", height: "100%" }}>
                <Sidenav />
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

// export default Figure;
