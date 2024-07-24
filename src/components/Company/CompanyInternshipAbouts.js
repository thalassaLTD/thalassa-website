import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SkillsTimeline from "./SkillsTimeline";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import { Divider, Grid, IconButton } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { createUseStyles } from "react-jss";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import TvIcon from '@mui/icons-material/Tv'

const useStyles = createUseStyles((theme) => ({
  benefitsContainer: {
    boxShadow:
      "0px 1px 9px 4px rgba(0,0,0,0.2), 0px 2px 10px 1px rgb(0 0 0 / 10%)",
  },
}));

export default function CompanyBanner({ companyData }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const onEnrollClick = (internship_id) => {
    // alert("Enrolled in the project!")
    navigate(`/internship/${internship_id}`);
  };

  return (
    <>
      <Box sx={{ width: "100%"}}>
        <Box sx={{ py: 6, px: 12, background:'#f3f5f7' }}>
          <Typography gutterBottom className="header" variant="h5" >
            Why join this Virtual Experience Program?
          </Typography>
          <Divider orientation="horizontal" sx={{ mb: "1rem" }} />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              {companyData?.why_join_paragraphs?.map((whyJoin) => (
                <>
                  <Typography className="body" variant="body1">
                    {whyJoin}
                  </Typography>
                </>
              ))}
            </Grid>
            <Grid item xs={10}>
              <CardMedia
                component="iframe"
                width="420"
                height="415"
                src={companyData?.project_video}
                sx={{ m: 2, ml: 0 }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ px: 12, py: 2, background: "#fff" }}>
          <Typography
            gutterBottom
            className="header"
            mt={3}
            variant="h5"
            textAlign='center'>
            How will you benefit?
          </Typography>
          <Grid
            container
            spacing={6}
            justifyContent="space-around"
            alignContent="center"
            sx={{ py: 8 }}
          >
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              {/* <IconButton sx={{ background: "rgba(225,225,225, 0.3)" }}> */}
              <EmojiEventsIcon sx={{ color: "blue" }} fontSize="large" />
              {/* </IconButton> */}
              <Typography variant="h6">
                Earn a Certificate
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              {/* <IconButton sx={{ background: "rgba(225,225,225, 0.3)" }}> */}
              <AccessTimeIcon sx={{ color: "blue" }} fontSize="large" />
              {/* </IconButton> */}
              <Typography variant="h6">
                Do it in your own time
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              {/* <IconButton sx={{ background: "rgba(225,225,225, 0.3)" }}> */}
              <DescriptionIcon sx={{ color: "blue" }} fontSize="large" />
              {/* </IconButton> */}
              <Typography variant="h6">
                Show Skills through Assignments
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              {/* <IconButton sx={{ background: "rgba(225,225,225, 0.3)" }}> */}
              <TvIcon sx={{ color: "blue" }} fontSize="large" />
              {/* </IconButton> */}
              <Typography variant="h6">
                Show skills through Video Interviews
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              {/* <IconButton sx={{ background: "rgba(225,225,225, 0.3)" }}> */}
              <ArticleOutlinedIcon sx={{ color: "blue" }} fontSize="large" />
              {/* </IconButton> */}
              <Typography variant="h6">
                Build Professional Resume
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              {/* <IconButton sx={{ background: "rgba(225,225,225, 0.3)" }}> */}
              <ContactPageOutlinedIcon sx={{ color: "blue" }} fontSize="large" />
              {/* </IconButton> */}
              <Typography variant="h6">
                Make your CV and LinkedIn stand out
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 2, px: 12, background:'#f3f5f7' }}>
          <Typography gutterBottom className="header" variant="h5">
            What will you learn?
          </Typography>
          <Divider orientation="horizontal" sx={{ mb: "1rem" }} />
          {companyData?.what_learn && (
            <SkillsTimeline tasks={companyData?.what_learn} />
          )}
        </Box>
      </Box>
    </>
  );
}
