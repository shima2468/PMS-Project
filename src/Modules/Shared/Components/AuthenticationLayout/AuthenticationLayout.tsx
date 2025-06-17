import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftBg from '../../../../assets/images/LeftBg.png';
import RightBg from '../../../../assets/images/RightBg.png';
import Logo from "../../../../assets/images/PMS 3.png";
const AuthenticationLayout: React.FC = () => {
  return (
  <div
      className="auth-container min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{ backgroundColor: '#0E382F' }}
    >
      {/* Left Background Shape */}
      <div
        className="position-absolute start-0 top-0 h-100"
      >
        <img
          src={LeftBg}
          alt="left-bg"
          className="h-100"
        />
      </div>

      {/* Right Background Shape */}
      <div
        className="position-absolute end-0 top-0 h-100"
      >
        <img
          src={RightBg}
          alt="right-bg"
          className="h-100"
        />
      </div>
<div className='row justify-content-center align-items-center z-3'>
     {/* Logo */}
       <div className="text-center mb-4">
          <img src={Logo} alt="PMS Logo" />
        </div>

      {/* Login Card */}
     <div className="col-md-12">
       <div
        className=" rounded-4 p-5 text-white mx-2"
        style={{
         
         background: '#315951E5', // green with opacity
        }}
      >
   
        {/* Title */}
     
          <p className="text-uppercase text-white mb-1" style={{ fontSize: '0.85rem' }}>
            welcome to PMS
          </p>       
  

        <Outlet />
      </div>
     </div>
</div>
    </div>
  );
};

export default AuthenticationLayout;
