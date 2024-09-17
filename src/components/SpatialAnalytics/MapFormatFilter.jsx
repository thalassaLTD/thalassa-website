import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const MapFormatFilter = ({ mapFormat, setMapFormat }) => (
  <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
    <FormLabel component="legend">Format</FormLabel>
    <RadioGroup
      name="mapFormat"
      value={mapFormat}
      onChange={(e) => setMapFormat(e.target.value)}
    >
      <FormControlLabel value="Cubes" control={<Radio />} label="Cubes" />
      <FormControlLabel value="Maps" control={<Radio />} label="Maps" />
    </RadioGroup>
  </FormControl>
);

export default MapFormatFilter;
