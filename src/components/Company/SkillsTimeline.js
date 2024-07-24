import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';


// export default function SkillsTimeline({ skills }) {
//   return (
//     <Timeline>
//       {skills?.map((skill, index) => (
//         <TimelineItem key={index}>
//           <TimelineOppositeContent style={{ maxWidth: "1px", paddingLeft: '0px', paddingBottom: '0px', paddingTop: '0px',  marginBottom:'0px' }} />
//           <TimelineSeparator>
//             <TimelineDot sx={{backgroundColor:"cornflowerblue"}}/>
//             {index < skills.length - 1 && <TimelineConnector />}
//           </TimelineSeparator>
//           <TimelineContent>{skill}</TimelineContent>
//         </TimelineItem>
//       ))}
//     </Timeline>
//   );
// }


export default function SkillsTimeline({ tasks }) {
  debugger
  return (
    <Grid container>
      <Grid item xs={12}>
    <Timeline>
      {tasks?.map((taskItem,index)=>(
        <TimelineItem key={index}>
          <TimelineOppositeContent sx={{ maxWidth: "1px", p:0,  marginBottom:'0px' }} />
        <TimelineSeparator>
          <TimelineDot sx={{background:'blue'}}/>
          {index < tasks.length - 1 && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent sx={{mb:10}}>
        <Typography variant="h6" color='#123860' sx={{mb:3}}>
          {taskItem?.task}
        </Typography>
        <Grid item container spacing={4}>
        {taskItem?.skills.map((skill,s_id)=>
        <Grid item key={s_id}>
       <Typography variant='body1'><CheckIcon sx={{color:'blue',mr:1}}/> {skill}</Typography>
       </Grid>)}
       </Grid>
        </TimelineContent>
      </TimelineItem>
      ))}
      
    </Timeline>
    </Grid>
    </Grid>

  );
}

