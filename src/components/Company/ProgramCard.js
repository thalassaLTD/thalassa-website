import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

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
    height: "100%",
  },
  autocomplete: {
    "& .MuiAutocomplete-option Mui-focused": {
      background: "rgba(18,56,96,.4)",
      color: "#fff",
    },
  },
  search: {
    width: "100%",
    marginBottom: "16px",
  },
}));

const ProgramCard = ({ internship }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onCardClick = (internship_id) => {
    navigate(`/explore/company/${internship_id}`);
  };

  return (
    <Card className={classes.card}>
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
        <span
          onClick={() => {
            onCardClick(internship.internship_id);
          }}
          className="btn-custom rounded-pill page-scroll"
        >
          Explore
        </span>
      </CardActions>
    </Card>
  );
};

export default ProgramCard;
