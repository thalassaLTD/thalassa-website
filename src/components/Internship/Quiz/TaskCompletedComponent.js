import { Stack, Typography } from '@mui/material'
import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const TaskCompletedComponent = ({score,totalQuestions}) => {
  return (
    <Stack spacing={2} alignItems='center' sx={{py:4}}>
      <CheckCircleOutlineOutlinedIcon color="success" sx={{fontSize:'6rem'}}/>
    <Typography variant="h6" >
     Your have completed your quiz
    </Typography>
    <Typography variant="h6" >
    Score: <b>{score}/{totalQuestions}</b>
    </Typography>
  </Stack>
  )
}

export default TaskCompletedComponent