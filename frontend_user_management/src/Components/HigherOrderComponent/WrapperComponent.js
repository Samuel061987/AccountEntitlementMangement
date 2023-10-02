import React from 'react';
import TitleText from '../Common/TitleText';
import SignupLink from '../Common/SignupLink';
import '../Common/TitleText';
import './WrapperComponent.css'

const WrapperComponent = (Component) => (props) => {

    return (
        <>
        <div className='app-container'>
            <div className="wrapper">
                <TitleText/>
                <div className="form-container">
                    <div className="form-inner">
                    <Component {...props} />
                    </div>
                <SignupLink/>
                </div>
            </div>
            </div>
        </>
       );
};

export default WrapperComponent;