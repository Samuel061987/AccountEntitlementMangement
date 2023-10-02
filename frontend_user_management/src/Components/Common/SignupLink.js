import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';

const SignupLink = () => {
    const location = useLocation();
    const [showSignup,setShowSignup]=useState(false);
    const [showLogin,setShowLogin]=useState(false);
    
    useEffect(()=>{
       if(location.pathname === "/signup"){
        setShowSignup(false);
        setShowLogin(true);
       }
       else if(location.pathname === "/login" || location.pathname === "/"){
        setShowSignup(true);
        setShowLogin(false);
       }
    },[location]);
    
    return (
        <>
        <div style={{marginTop:'10px',textAlign:'center'}}>
       {showSignup && <Link to={`/signup`}>Create Account</Link>}
       {showLogin && <Link to={`/login`}>Login</Link>}
       </div>
      </>
    );
};

export default SignupLink;