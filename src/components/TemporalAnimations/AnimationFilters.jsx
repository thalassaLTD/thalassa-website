import { Grid } from "@mui/material";
import React from "react";
import CitySelector from "./CitySelector";
import ExperimentSelector from "./ExperimentSelector";
import TrendSelector from "./TrendSelector";

function AnimationFilters({
  selectedArea,
  handleCityChange,
  cities,
  selectedFolder,
  handleFolderChange,
  folders,
  htmlFiles,
  selectedFileTitles,
  handleFileChange,
}) {
  return (
    <Grid container spacing={2} className="paddingall">
      <Grid item xs={12} md={2}>
        <CitySelector
          selectedArea={selectedArea}
          handleCityChange={handleCityChange}
          cities={cities}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ExperimentSelector
          selectedFolder={selectedFolder}
          handleFolderChange={handleFolderChange}
          folders={folders}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TrendSelector
          htmlFiles={htmlFiles}
          selectedFileTitles={selectedFileTitles}
          handleFileChange={handleFileChange}
        />
      </Grid>
    </Grid>
  );
}

export default AnimationFilters;
