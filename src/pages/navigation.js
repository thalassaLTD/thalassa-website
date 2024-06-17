import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'black' }}>
          Dynamic Modeling Solutions
        </Typography>
        <div>
          <Typography variant="h6" component={Link} to="/courses" style={{ textDecoration: 'none', color: 'black', marginRight: '20px' }}>
            Courses
          </Typography>
          <Typography variant="h6" component={Link} to="/courses" style={{ textDecoration: 'none', color: 'black', marginRight: '20px' }}>
            Courses
          </Typography>
          <Typography variant="h6" component={Link} to="/courses" style={{ textDecoration: 'none', color: 'black', marginRight: '20px' }}>
            Courses
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
