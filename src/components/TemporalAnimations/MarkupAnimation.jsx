import { Box, Divider, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

function MarkupAnimation({
  file,
  isEditing,
  paragraphs,
  setIsEditing,
  handleParagraphChange,
  handleSaveParagraph,
  title,
  fileTitleToUrl,
}) {
  return (
    <Paper style={{ padding: 16 }} key={file.name}>
      {" "}
      {/* Use file.name as the key */}
      <Typography variant="h5">{title}</Typography>
      <video width="1100" height="600" controls>
        <source src={fileTitleToUrl[title]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Divider />
      {!isEditing ? (
        <Box display={"flex"} gap={1}>
          <Typography>{paragraphs[title] || ""}</Typography>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => setIsEditing(true)}
          />
        </Box>
      ) : (
        <>
          <Typography variant="body1">
            <textarea
              rows={5}
              style={{ width: "100%", height: "auto" }}
              value={paragraphs[title] || ""}
              onChange={(e) => handleParagraphChange(title, e.target.value)}
            />
          </Typography>
          <button onClick={() => handleSaveParagraph(file.name, title)}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}
    </Paper>
  );
}

export default MarkupAnimation;
