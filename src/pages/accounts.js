// import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import DashboardLayout from "../components/dashboard-layout";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Avatar,
  CardActions,
  Typography,
  Container,
} from "@mui/material";
import { useState } from "react";

const Account = () => {
  const { data } = useSelector(({ orgDetails }) => orgDetails);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={data} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Card>
                <CardHeader
                  subheader="The information can be edited"
                  title="Integrations"
                />
                <Divider />
                <CardContent>
                  <Grid item md={3} xs={12}>
                    <TextField
                      fullWidth
                      label="Name of the Company"
                      // name="company_name"
                      // onChange={handleChange}
                      required
                      value={data?.company_name}
                      variant="outlined"
                    />
                  </Grid>
                </CardContent>

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Android Playstore ID"
                        name="playstore"
                        // onChange={handleChange}
                        required
                        value={data?.playstore}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Apple Appstore ID"
                        name="appstore"
                        // onChange={handleChange}
                        value={data?.appstore}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Twitter handle"
                        name="twitter"
                        // onChange={handleChange}
                        value={data?.twitter}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Trustpilot link"
                        name="trustpilot"
                        // onChange={handleChange}
                        value={data?.trustpilot}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    p: 2,
                  }}
                >
                  <Button color="primary" variant="contained">
                    Save details
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const AccountWithLayout = (page) => (
  <DashboardLayout>
    <Account />
  </DashboardLayout>
);

export default AccountWithLayout;
