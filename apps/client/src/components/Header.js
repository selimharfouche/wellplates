import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

const Header = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        
      <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: 'pointer' }} 
          onClick={handleTitleClick}
        >
          Wellplates Search Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
