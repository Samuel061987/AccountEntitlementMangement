import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useNavigate } from "react-router-dom";

const style = {
    flexGrow: 1
};


const NavBar = () => {
    const navigate = useNavigate();

  const d = new Date();
  const text = d.toTimeString();
    const signOut =()=>{
         sessionStorage.clear();
         navigate('/login');
     }
    
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={style}>
                        User Management Application
                    </Typography>
                   <span>Last Login:{text}</span> <Button color="inherit" onClick={()=>signOut()}>Sign Out</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;