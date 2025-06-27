import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { headerSx } from '@/app/styles/HeaderStyles/HeaderStyles.styles';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={headerSx}>
          Pet 24/7
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
