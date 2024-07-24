import React from 'react'
import { Card, Grid, CardContent, Typography } from "@mui/material";


export default function InterviewInstructions({ interviewQuestions }) {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} md={8} className="m">
        <Card>
          <CardContent>
            <Typography variant="h5" textAlign={"left"}>
              Video Interview Instructions
            </Typography>
            <ul>
              <li>
                Ensure a professional appearance in the video interview since it will be presented to the company.
              </li>
              <li>Please ensure a stable good quality internet connetion for this task. Depending on the internet speed, it might take few seconds to few minutes to upload a video. Don’t change the tab.</li>
              <li>To begin the video interview, click on the "Start Interview" button.</li>
              <li>When you have finished answering all the questions, click on the "Stop Recording" button.</li>
              <li>You can review your video by clicking play button.</li>
              <li>To review your video and submit it, click on the "Preview and Submit Interview" button.</li>
              <li>The button "Go to Next" will take you to the next question. Please note that once you click it, you will not be able to go back to the previous question.</li>
            </ul>
            This task aims to assess your ability to understand the process.
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
