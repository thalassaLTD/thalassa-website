import React from "react";
import { Box, Paper, Tooltip, Divider, Typography } from "@mui/material";


const VideoDisplay = ({ selectedFileTitles, fileTitleToUrl, htmlFiles }) => {
  console.log(selectedFileTitles)
  console.log(fileTitleToUrl)
  console.log(htmlFiles)
  return (
    <div>
      {selectedFileTitles.map((title) => {
        // Find the matching file in htmlFiles based on the title
        const file = htmlFiles.find((file) => file.title === title);

        return (
          <Paper style={{ padding: 16 }}>
            <div key={title}>
              {/* Display video */}
              <Typography variant="h5">{title}</Typography>
              <video width="1100" height="600" controls>
                <source src={fileTitleToUrl[title]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Check if the file and Paragraph exist and display the Paragraph */}
              {file && file.Paragraph && (
                <Box mt={2} mb={4}>
                  <p>{file.Paragraph}</p>
                </Box>
              )}

              {/* <a href={"https://thalassa.ltd/Experiments?type=Temporal%20Animations&area=Greater%20London&folder=Depression%20Growth%20Drivers%20(DGD)&id=DGD2.mp4"} target="_blank" rel="noopener noreferrer">File Link </a> */}


              <Divider />
            </div>
          </Paper>
        );
      })}
    </div>
  );
};

export default VideoDisplay;
