import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyUeJ6gwm221GHEsezMN1sfx6YKxH29urVndKAwS-P9Snir2XVKCjv1O1qXtg&s",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "RoundPier",
  timezone: "GTM-7",
};

export const AccountProfile = (props) => {
  const { user = {} } = props;
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user?.logo}
            variant="square"
            sx={{
              height: 64,
              // mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user?.company_name}
          </Typography>
          {/* <Typography color="textSecondary" variant="body2">
            {`${user?.city} ${user.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload Picture
        </Button>
      </CardActions>
    </Card>
  );
};
