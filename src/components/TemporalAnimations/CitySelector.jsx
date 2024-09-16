// CitySelector.jsx
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CitySelector = ({ selectedCity, handleCityChange, cities }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel>Select City</InputLabel>
    <Select value={selectedCity} onChange={handleCityChange} label="Select City">
      {cities.map((city) => (
        <MenuItem key={city} value={city}>
          {city}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CitySelector;
