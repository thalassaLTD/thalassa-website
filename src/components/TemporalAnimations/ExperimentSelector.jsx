// ExperimentSelector.jsx
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ExperimentSelector = ({ selectedFolder, handleFolderChange, folders }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel>Select Experiment</InputLabel>
    <Select value={selectedFolder} onChange={handleFolderChange} label="Select Experiment">
      {folders.map((folder) => (
        <MenuItem key={folder} value={folder}>
          {folder}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ExperimentSelector;
