// VideoDisplay.jsx
import React from "react";
import { Box } from "@mui/material";

const VideoDisplay = ({ selectedFileTitles, fileTitleToUrl, htmlFiles }) => (
  <>
    {selectedFileTitles.map((title, index) => {
      const url = fileTitleToUrl[title];
      const file = htmlFiles.find((file) => file.title === title);
      return (
        <Box key={index} sx={{ marginTop: '0px' }}>
          {url && (
            <>
              <video width="1200" height="600" controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {file && (
                <Box sx={{ marginTop: '0px' }}>
                  <h3>{file.Title}</h3>
                  <p>{file.Paragraph}</p>
                  <a href={file.Link} target="_blank" rel="noopener noreferrer">Code Link (currently disabled)</a>
                </Box>
              )}
            </>
          )}
        </Box>
      );
    })}
  </>
);

export default VideoDisplay;
