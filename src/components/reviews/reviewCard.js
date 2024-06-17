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

const ReviewCard = (props) => {
  const { review, ...rest } = props;
  return (
    <Card sx={{ p: 2, mt: 1 }} {...rest}>
      <Box sx={{ mb: 2 }}>
        <Chip
          sx={{ borderRadius: 0 }}
          label={format(new Date(review.created_at), `do MMM, yyyy`)}
        />
      </Box>
      {/* <Typography variant="p">
                  {getHighlightedText(review.text, review.highlightText)} #Has issue with regex when we have (???) this kind of text
                </Typography> */}
      <div style={{ fontSize: "16px" }}>
        <Highlighter
          highlightClassName="highlighted-text-phrase"
          searchWords={[review.highlightText]}
          autoEscape={true}
          activeIndex={0}
          textToHighlight={review.text}
        />
      </div>

      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          ml: 0,
          mt: 2,
          pl: 0,
        }}
      >
        <Box sx={{ display: "flex" }}>
          {review.sentiment && (
            <Chip
              sx={{ cursor: "pointer" }}
              color={review.sentiment ? "success" : "error"}
              label={review.sentiment ? "Positive" : "Negative"}
            />
          )}
          {review.source === "playstore" ? (
            <AndroidIcon color="green" />
          ) : review.source === "twitter" ? (
            <TwitterIcon color="green" />
          ) : review.source === "trustpilot" ? (
            <StarRateOutlinedIcon color="green" />
          ) : (
            <AppleIcon />
          )}
          <Rating
            sx={{ padding: 0, ml: "20px" }}
            name="read-only"
            value={review.rating}
            readOnly
          />
        </Box>
        <Box sx={{ display: "flex", mt: 1, ml: "0 !important" }}>
          {review.labels.map((label) => (
            <Chip
              label={label}
              component="span"
              href="#basic-chip"
              variant="outlined"
              sx={{
                borderRadius: "4px",
                color: "primary",
                mt: 1,
                ml: 0,
                mr: 2,
              }}
            />
          ))}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ReviewCard;
