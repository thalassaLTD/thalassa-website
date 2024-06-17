import React from "react";
import Rating from "@mui/material/Rating";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import TwitterIcon from "@mui/icons-material/Twitter";
import StarRateOutlinedIcon from "@mui/icons-material/StarRateOutlined";
import { Box, Card, CardActions } from "@mui/material";
import Chip from "@mui/material/Chip";
// import { getHighlightedText } from "../utils";
import Highlighter from "react-highlight-words";
import { format } from "date-fns";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RecommendationCard = (props) => {
  const { review, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ p: 2, mt: 1 }} {...rest}>
      <Box sx={{ mb: 1 }}>
        <Chip
          sx={{ borderRadius: 0 }}
          label={format(new Date(review.created_at), `do MMM, yyyy`)}
          style={{ fontSize: "10px", height: "20px" }}
        />
        <Box style={{ float: "right" }}>
          {review.source === "playstore" ? (
            <AndroidIcon color="green" />
          ) : review.source === "twitter" ? (
            <TwitterIcon color="green" />
          ) : review.source === "trustpilot" ? (
            <StarRateOutlinedIcon color="green" />
          ) : (
            <AppleIcon />
          )}
        </Box>
      </Box>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          {review.suggestionText}
        </Button>
        <Dialog
          open={open}
          maxWidth="lg"
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {/* {"Use Google's location service?"} */}
          </DialogTitle>
          <DialogContent
          >
            <DialogContentText id="alert-dialog-description">
              <Card sx={{ p: 2, mt: 1 }} {...rest}>
                <Box sx={{ mb: 1 }}>
                  <Chip
                    sx={{ borderRadius: 0 }}
                    label={format(new Date(review.created_at), `do MMM, yyyy`)}
                    style={{ fontSize: "10px", height: "20px" }}
                  />
                  <Box style={{ float: "right" }}>
                    {review.source === "playstore" ? (
                      <AndroidIcon color="green" />
                    ) : review.source === "twitter" ? (
                      <TwitterIcon color="green" />
                    ) : review.source === "trustpilot" ? (
                      <StarRateOutlinedIcon color="green" />
                    ) : (
                            <AppleIcon />
                          )}
                  </Box>

                </Box>
                <Highlighter
                  highlightClassName="highlighted-text-phrase"
                  searchWords={[review.suggestionText]}
                  autoEscape={true}
                  activeIndex={0}
                  textToHighlight={review.text}
                />
              </Card>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button onClick={handleClose} autoFocus>
              Close
          </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* <div style={{ fontSize: "16px", lineHeight: "150%" }}>
        <Highlighter
          highlightClassName="highlighted-text-phrase"
          searchWords={[]}
          autoEscape={true}
          activeIndex={0}
          textToHighlight={review.suggestionText}
        />
      </div> */}
    </Card>
  );
};

export default RecommendationCard;
