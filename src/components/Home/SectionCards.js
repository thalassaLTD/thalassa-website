import React, { useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

// import { AuthContext } from '../Auth/Auth';
import './section_cards.css'


import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid
} from '@mui/material';

// import AmplitudeEvent from '../components/AmplitudeEvent'
const baseURL = "https://api.joinuplyft.com";

export default function AccountMenu(props) {
  // AmplitudeEvent("/InternshipPage-loaded");

  const { cardData } = props;

  let history = useNavigate()
  const [enroll, setEnroll] = React.useState(null)
  const [load, setLoad] = React.useState(false)

  const onCardClick = (projectID, interID) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // history(`company/${interID}?enr=${enroll}`)
    // history(`/company/${interID}`)
    history(('/users/:userId', { replace: false, state: { userId: interID } }))
  }

  return (
    <>
      {load ? "" :
        <Card className='Company-Card' onClick={() => { onCardClick(cardData.project_id, cardData.internship_id) }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image={cardData.project_image}
          />
          <img className='logo-img' src={cardData.company_logo} alt="Loading..." />

          <CardContent style={{ backgroundColor: 'rgb(98, 103, 97', color: 'white' }}>
            <Typography gutterBottom variant="body1" component="div">
              {cardData.company_name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {cardData.project_title}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {cardData.project_field}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p style={{ textAlign: 'right', backgroundColor: 'rgb(98, 103, 97)' }}>5 - 6 hours</p>
            </Typography>
          </CardContent>
          <CardActions style={{ backgroundColor: '#132c1f', width: '100%' }}>
            <Button size="small" style={{ width: '100%', backgroundColor: '#132c1f', color: 'white' }}>Apply Now</Button>
          </CardActions>
        </Card>
      }
    </>
  );
}