import React from 'react'
import { Container, Divider, Stack } from "@mui/material";

const CustomContainer = ({children}) => {
  return (
    <Container disableGutters maxWidth="sm" sx={{border:'1px solid grey',p:3,borderRadius:4,ml:0}}>
      <Stack  divider={<Divider orientation="horizontal" flexItem />} direction="column" spacing={2} >
        {children}
        </Stack>
    </Container>
  )
}

export default CustomContainer