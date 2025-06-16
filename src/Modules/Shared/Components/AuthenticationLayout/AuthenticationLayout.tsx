import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftBg from '../../../../assets/images/LeftBg.png';
import RightBg from '../../../../assets/images/RightBg.png';
import AuthBg from '../../../../assets/images/Auth_Bg.jpg'; // Used if needed

const AuthenticationLayout: React.FC = () => {
  return (
    <div className="auth-container min-vh-100 d-flex align-items-center justify-content-center position-relative">
      {/* Left Background */}
      <div className="position-absolute start-0 top-0 w-50 h-100 overflow-hidden">
        <img
          src={LeftBg}
          alt="left-bg"
          className="img-fluid h-100 object-fit-cover"
        />
      </div>

      {/* Right Background */}
      <div className="position-absolute end-0 top-0 w-50 h-100 overflow-hidden">
        <img
          src={RightBg}
          alt="right-bg"
          className="img-fluid h-100 object-fit-cover"
        />
      </div>

      {/* Auth Card */}
      <div
        className="position-relative z-3 bg-white bg-opacity-75 rounded-4 p-5 text-dark w-100"
        style={{ maxWidth: '400px' }}
      >
        <div className="text-center mb-4">
          <img
            src="/images/logo.png"
            alt="PMS Logo"
            className="img-fluid mb-2"
            style={{ width: '80px' }}
          />
          <h5>Welcome to PMS</h5>
          <p className="text-muted">Please log in to continue</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
