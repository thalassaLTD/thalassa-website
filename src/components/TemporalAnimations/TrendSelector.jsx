// TrendSelector.jsx
import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Box } from "@mui/material";

const TrendSelector = ({ htmlFiles, selectedFileTitles, handleFileChange }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel>Select Trend</InputLabel>
    <Select
      multiple
      value={selectedFileTitles}
      onChange={handleFileChange}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Box key={value} sx={{ border: '1px solid #ccc', borderRadius: 1, padding: '2px 4px' }}>
              {value}
            </Box>
          ))}
        </Box>
      )}
    >
      {htmlFiles.map((file) => (
        <MenuItem key={file.title} value={file.title}>
          <Checkbox checked={selectedFileTitles.indexOf(file.title) > -1} />
          <ListItemText primary={file.title} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default TrendSelector;
