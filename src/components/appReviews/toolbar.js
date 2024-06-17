import {
  Box,
  // Button,
  Card,
  // CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  // InputBase,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      padding: 0,
    },
  })
);

export const CustomerListToolbar = (props) => {
  const classes = useStyles();
  const { companyName, onComapnyChnage, onSubmit } = props;
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        m: 0,
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{}} variant="h4">
          Reviews
        </Typography>
      </Box>
      {/* <Box sx={{ mt: 1 }}>
          <Box sx={{ maxWidth: 500, p: 0, minWidth: 500 }}>
            <TextField
              onChange={onComapnyChnage}
              onKeyPress={(e) => {
                if (e.key === "Enter") onSubmit();
              }}
              value={companyName}
              className={classes.textField}
              sx={{ p: 0 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search App"
              variant="outlined"
            />
          </Box>
        </Box> */}
    </Box>
  );
};
