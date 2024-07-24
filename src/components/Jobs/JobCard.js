import React from "react";
import { createUseStyles } from "react-jss";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import { LocationOnOutlined, ScheduleOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 6,
    background: "#F3F7F9",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: 4,
  },
  card: {
    background: "#fff",
    boxShadow: "none",
    borderRadius: 16,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& .MuiCardHeader-subheader": {
      fontWeight: 600,
      display:'flex',
      alignItems:'self-end'
    },
  },
  header: {
    padding: 2,
    background: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 12,
    background: "#123860",
  },
  content: {
    // padding: 3,
  },
  chip: {
    marginRight: 1,
    marginTop: 2,
  },
  locationIcon: {
    fontSize: "16px",
    marginRight: 1,
  },
  scheduleIcon: {
    fontSize: "16px",
    marginRight: 1,
  },
  divider: {
    margin: 2,
  },
  applyButton: {
    background: "#F06C64",
    color: "white",
    borderRadius: "32px",
    padding: 1,
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      background: "#E35752",
    },
  },
  jobDesc:{
    display: "-webkit-box",
    WebkitLineClamp: 2,
    overflow: "hidden",
    WebkitBoxOrient: "vertical"
}
}));

export default function JobCard({ job,applyJob,applied }) {
  const classes = useStyles();
  const [showDesc, setShowDesc] = useState(false)

  return (
    <Grid item xs={12} key={job?.job_id} sx={{ height: "auto" }}>
      <Card sx={{ p: 3 }} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              // alt={job?.company}
              // src={job?.logo}
              className={classes.avatar}
            >
              {job?.job_title?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={
            <Typography fontWeight={600} variant="h6">
              {job?.job_title}
            </Typography>
          }
          subheader={<>
          {job?.company_name}
          <LocationOnOutlined sx={{ml:2}}/> 
          {job?.location}
          </>}
          action={
            <Button
              sx={{
                backgroundColor: "#123860",
                borderRadius: 20,
                px: 1.6,
                py: 1,
              }}
              variant="contained"
              size="small"
              onClick={()=>applyJob(job?.job_id)}
              disabled={applied}
            >
             {applied? 'Applied':'Apply Now'}
            </Button>
          }
          className={classes.header}
        />
        <CardContent
          sx={{
            px: 0,
            py: 3
          }}
        >
          <p className={!showDesc && classes.jobDesc}>
          {job?.job_description?.length > 0 &&
            job?.job_description.map((desc, id) => (
              <Typography key={id} variant="body1" gutterBottom>
                {desc}
              </Typography>
            ))}            
          </p>
          {showDesc && <>
          <Typography variant="body-1" fontWeight={600}>Skills</Typography>
          <ul>
              {(job?.core_skills?.split(',')?.map(skill=>
                 <li><Typography>- {skill}</Typography></li>))}
          </ul>
          {job?.no_of_positions && <div >
          No. of positions: <b>{job?.no_of_positions}</b>
          </div>}
          {job?.urgency && <div>
          Urgent requirement:  <b>{job?.urgency}</b>
          </div>}
          {job?.linked_programs&& <div>
          Linked Assignment Programs: <a target='_blank' href={job?.linked_programs}>{job?.linked_programs}</a> 
          </div>}
          </>}
          <Button sx={{textTransform:'none'}} onClick={()=>setShowDesc(prev=>!prev)}>{showDesc?'View Less':'View More'}</Button>
        </CardContent>
        <CardActions sx={{ px: 0 }}>
          {job?.requirement && (
            <Chip
              sx={{
                fontWeight: 600,
                px: 1,
                backgroundColor: "#edf1f7",
              }}
              label={job?.requirement}
            />
          )}
          {job?.work_mode && (
            <Chip
              sx={{
                fontWeight: 600,
                px: 1,
                backgroundColor: "#edf1f7",
              }}
              label={job?.work_mode}
            />
          )}
          {job?.experience && (
            <Chip
              sx={{
                fontWeight: 600,
                px: 1,
                backgroundColor: "#edf1f7",
              }}
              label={job?.experience}
            />
          )}
          {job?.job_type && (
            <Chip
              sx={{
                fontWeight: 600,
                px: 1,
                backgroundColor: "#edf1f7",
              }}
              label={job?.job_type}
            />
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
