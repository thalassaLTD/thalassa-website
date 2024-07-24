import { Grid, Stack, Card, CardContent, Typography } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function DashboardGrid({scoreboardData}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Stack spacing={2} direction="row">
          <Card sx={{ minWidth: 49 + "%", height: 150,borderRadius:3 }} className="gradient">
            <CardContent>
              <div className="iconstyle"></div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "white" }}
              >
                {scoreboardData?.total_assignments}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ color: "#ccd1d1" }}
              >
                Total Assignments
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ minWidth: 49 + "%", height: 150,borderRadius:3  }}
            className="gradientlight"
          >
            <CardContent xs={12}>
              
              <Typography
                gutterBottom
                variant="body 2"
                component="div"
                sx={{ color: "#fff" }}
              >
                <AssignmentIcon sx={{color:"#fff"}} fontSize="large"/> 
                Completed Assignments
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "white" }}
              >
                {scoreboardData?.completed_assignments}
              </Typography>
              
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4} sx={{ pl:2 }}>
        <Stack spacing={2} >
        {/* <Card sx={{ maxWidth: 345 }}>
            <Stack spacing={2} direction="row">
              <div className="iconstyleblack">
                <StorefrontIcon />
              </div>
              <div >
                <span className="pricetitle">{certifications}</span>
                <br />
                <span className="pricesubtitle">Certifications</span>
              </div>
            </Stack>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <Stack spacing={2} direction="row">
              <div className="iconstyleblack">
                <StorefrontIcon />
              </div>
              <div >
                <span className="pricetitle">{immersions}</span>
                <br />
                <span className="pricesubtitle">Immersions</span>
              </div>
            </Stack>
          </Card> */}
        </Stack>
      </Grid>
    </Grid>
  );
}
