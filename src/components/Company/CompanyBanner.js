import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import CompanyInternshipAbouts from "./CompanyInternshipAbouts";
import { AuthContext } from "../Auth/Auth";
import { getCurrentUser, get, post } from "../../components/Helper";
import { createUseStyles } from "react-jss";
import SnackbarComponent from "../Alerts/SnackbarComponent";

const baseURL = "https://api.joinuplyft.com";

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
  bannerContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
}));

export default function CompanyBanner(companyData) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [enrollStatusText, setEnrollStatusText] = useState("Enroll Now");
  const [projectId, setProjectId] = useState();
  const { currentUser } = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [severity, setSeverity] = useState('success')

  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser?.id){
      axios
      .post(baseURL + "/getStudent", {
        googleuid: currentUser.uid,
      })
      .then((response) => {
        if (
          response.data.enrolled_internships?.includes(
            companyData.companyData.project_id
          )
        ) {
          setEnrollStatusText("Continue to program");
        }
      }).catch(err=>{
        setSnackbarMsg('Some error occurred.')
        setSeverity("error");
        setSnackbarOpen(true)
      });
    }
    
  }, [companyData]);

  const onEnrollClick = (internship_id) => {

    if (!currentUser) {
      navigate(`/signin`);
    } else {
      if (enrollStatusText === "Continue to program") {
        navigate(`/internship/${internship_id}`);
      }
      
      axios
        .post(baseURL + "/internshipEnroll", {
          student_id: currentUser.uid,
          project_id: companyData.companyData.project_id,
        })
        .then((response) => {
        })
        .catch((err) => {
          setSnackbarMsg('Some error occurred.')
          setSeverity("error");
          setSnackbarOpen(true)
        });
      setEnrollStatusText("Continue to program");
      navigate(`/internship/${internship_id}`);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
    setSnackbarMsg('')
    setSeverity('success')
  };

  return (
    <>
      {snackbarOpen && <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg} severity={severity} handleSnackbarClose={handleSnackbarClose}/>}
      <Card>
        <div className={classes.bannerContainer}>
          <CardMedia
            component="img"
            alt="green iguana"
            // height="25%"
            sx={{
              maxHeight: "40vh",
            }}
            image={companyData.companyData?.project_image}
          />
          <img
            src={companyData.companyData?.company_logo}
            alt=""
            className={classes.overlayImage}
          />
        </div>

        <CardContent sx={{ paddingTop: "10vh",px:12 }}>
          <Typography gutterBottom className="header" variant="h5" >
            {companyData.companyData?.company_name}
          </Typography>
          <Typography className="body" variant="body1">
            {companyData &&
              companyData.companyData?.company_description &&
              companyData.companyData.company_description.map((desc,id) => (
                <Typography key={id} className="body" variant="body1" >{desc}</Typography>
              ))}
          </Typography>
        </CardContent>
        <CardActions sx={{px:12}}>
          <Button
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "#123860",
              borderRadius: 20,
              p:1.3
            }}
            variant="contained"
            size="small"
            onClick={() => {
              onEnrollClick(companyData.companyData?.project_id);
            }}
          >
            {enrollStatusText}
          </Button>
        </CardActions>
      </Card>
      <CompanyInternshipAbouts companyData={companyData.companyData} />
      <Box pb={5} px={6}>
      <Button
        sx={{
          mt: 2,
          mb: 2,
          ml: 2,
          backgroundColor: "#123860",
          borderRadius: 20,
          p:1.3,
        }}
        variant="contained"
        size="small"
        onClick={() => {
          onEnrollClick(companyData.companyData?.project_id);
        }}
      >
        {enrollStatusText}
      </Button>
      </Box>
      
    </>
  );
}
