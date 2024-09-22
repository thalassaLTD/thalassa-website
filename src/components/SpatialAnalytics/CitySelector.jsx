// CitySelector.jsx
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CitySelector = ({ selectedArea, handleCityChange, cities }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel>Select Area</InputLabel>
    <Select value={selectedArea} onChange={handleCityChange} label="Select Area">
      {cities.map((city) => (
        <MenuItem key={city} value={city}>
          {city}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CitySelector;
