import { React, useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  TextField,
  MenuItem,
  Stack,
  Select,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  overlayImage: {
    position: "absolute",
    maxWidth: "50%",
    maxHeight: "50%",
    bottom: 0,
    display: "block", // set display to block to remove any extra whitespace
    transform: "translateY(50%)",
    borderRadius: "4px",
    background: "#fff",
    boxShadow:
      "0px 3px 6px 3px rgba(0,0,0,0.3), 0px 1px 4px 3px rgba(0,0,0,0.2)",
  },
  bannerContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  card: {
    maxWidth: 345,
    borderRadius: 0,
    paddingBottom: 6,
    borderRadius: "4px",
    transition: "all .15s",
    "&:hover": {
      boxShadow: "0px 3px 3px 3px rgba(0,0,0,0.2)",
      transform: "scale(1.03)",
    },
    height:'100%'
  },
}));

export default function EnrolledInternships({ internships, studentDetails }) {
  const classes = useStyles();
  const [filteredInternships, setFilteredInternships] = useState([]);
  const navigate = useNavigate();

  const onCardClick = (internship_id) => {
    navigate(`/company/${internship_id}`);
  };

  useEffect(() => {
    setFilteredInternships(internships);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 6 }}>
    
          <Typography
            variant="h6"
            sx={{ fontWeight: 600,mb:2 }}
            color="#123860"
          >
            Enrolled Programs
          </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, lg: 9, xl: 12 }}
        >
          {filteredInternships.map((internship) => {
            return (
              <Grid
                key={internship.internship_id}
                item
                xs={2}
                sm={4}
                lg={3}
                xl={3}
              >
                <Card
                  className={classes.card}
                  onClick={() => {
                    onCardClick(internship.internship_id);
                  }}
                >
                  <div className={classes.bannerContainer}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={internship.project_image}
                      alt="Project image"
                    />
                    <img
                      src={internship.company_logo}
                      alt=""
                      className={classes.overlayImage}
                    />
                  </div>
                  <CardContent sx={{ paddingTop: "7vh" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {internship.project_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {internship.company_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {internship.project_field}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estimated time: {internship.eta} Hours
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      sx={{
                        backgroundColor: "#123860",
                        borderRadius: 20,
                        pl: 4,
                        pr: 4,
                        pt: 1,
                        pb: 1,
                      }}
                      onClick={() => console.log("Apply button clicked")}
                    >
                      {studentDetails &&
                      studentDetails.enrolled_internships?.length > 0 &&
                      studentDetails.enrolled_internships.includes(
                        internship.project_id
                      )
                        ? "Continue to Program"
                        : "Apply now"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
    </Box>
  );
}
