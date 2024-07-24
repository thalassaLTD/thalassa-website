import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";
import { createUseStyles } from "react-jss";
import { CardActionArea } from "@mui/material";
import SnackbarComponent from "../Alerts/SnackbarComponent";

const useStyles = createUseStyles((theme) => ({
  overlayImage: {
    position: "absolute",
    maxWidth: "50%",
    maxHeight: "50%",
    bottom: 0,
    background:"#fff",
    display: "block", // set display to block to remove any extra whitespace
    transform: "translateY(50%)",
    borderRadius: '10px',
    boxShadow: '0px 3px 6px 3px rgba(0,0,0,0.3), 0px 1px 4px 3px rgba(0,0,0,0.2)',
  },
  bannerContainer:{
    display:'flex',
    justifyContent:'center',
    position:'relative'
  }
}));

export default function InternshipBanner({ projectData }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [internshipId, setInternshipId] = useState();  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
    setSnackbarMsg("");
    setSeverity("success");
  };

  return (
    <>
      <Card elevation={0}>
        <div className={classes.bannerContainer}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="0%"
            image={projectData?.project_image}
            sx={{
              maxHeight:'40vh'
            }}
          />
          <img
            src={projectData?.company_logo}
            alt=""
            className={classes.overlayImage}
          />
        </div>
        <CardContent sx={{px:12}}>
          <Typography gutterBottom variant="h6" component="div">
            {projectData?.company_name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {projectData?.project_title}
          </Typography>
        </CardContent>
      </Card>
      {snackbarOpen && (
        <SnackbarComponent
          snackbarOpen={snackbarOpen}
          snackbarMsg={snackbarMsg}
          severity={severity}
          handleSnackbarClose={handleSnackbarClose}
        />
      )}
      <Tasks internshipId={projectData.internship_id} setSnackbarOpen={setSnackbarOpen} setSnackbarMsg={setSnackbarMsg} setSeverity={setSeverity}/>
    </>
  );
}
