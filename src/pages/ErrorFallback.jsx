import { Button, Container, Typography } from "@mui/material";

export default function Fallback({ error }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    
      function handleReload() {
        window.location.reload();
      }
      
        return (
          <Container maxWidth="sm" sx={{height:'97vh',display:'flex',alignItems:'center', flexDirection:'column'}}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Oops! Something went wrong.
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Please try again later or contact support.
            </Typography>

            <Button
              variant="contained"
              sx={{background:'"#123860"'}}
             
              onClick={handleReload}
            >
              Reload Page
            </Button>
          </Container>
        );
      
    
  }