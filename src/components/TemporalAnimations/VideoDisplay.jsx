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
              <video width="1100" height="600" controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {file && (
                <Box sx={{ marginTop: '0px' }}>
                  <h3>{file.Title}</h3>
                  <p>{file.Paragraph}</p>

                  <a href={"https://thalassa.ltd/Experiments?type=Temporal%20Animations&area=Greater%20London&folder=Depression%20Growth%20Drivers%20(DGD)&id=DGD2.mp4"} target="_blank" rel="noopener noreferrer">File Link </a>
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
