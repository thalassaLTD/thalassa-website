import { Circles } from "react-loader-spinner";
import * as React from 'react';
import Box from '@mui/material/Box';

const style={
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    justifyContent: 'center',
    left: 2,
    right: 0,
    top: 0,
    background:'rgba(0,0,0,.1)'
}
export default function Loading() {
  return (
    <Box sx={{ ...style }}>
      <Circles
  height="80"
  width="80"
  color="#123860"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </Box>
  );
}