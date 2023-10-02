import React, { useState, useEffect } from 'react';
import './TitleText.css';
import { useLocation } from 'react-router-dom';
const TitleText = () => {
    const location = useLocation();
    const [login,setLogin]=useState(false);
    const [signup,setSignup]=useState(false);

    useEffect(()=>{
       if(location.pathname === "/login" || location.pathname === "/"){
        setLogin(true);
        setSignup(false);
       }
       else if(location.pathname === "/signup"){
        setLogin(false);
        setSignup(true);
       }
    },[location]);
    
    return (
        <>
        <div className="title-text">
        {login && <div className="title login">Login Form</div>}
        {signup && <div className="title signup">Signup Form</div>}
      </div> 
      </>
    );
};

export default TitleText;