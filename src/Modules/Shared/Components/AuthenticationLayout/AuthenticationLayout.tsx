import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftBg from '../../../../assets/images/LeftBg.png';
import RightBg from '../../../../assets/images/RightBg.png';

const AuthenticationLayout: React.FC = () => {
  return (
  <div
      className="auth-container min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{ backgroundColor: '#00332F' }}
    >
      {/* Left Background Shape */}
      <div
        className="position-absolute start-0 top-0 h-100"
        style={{
          width: '50%',
          overflow: 'hidden',
          clipPath: 'ellipse(60% 100% at 0% 50%)',
        }}
      >
        <img
          src={LeftBg}
          alt="left-bg"
          className="img-fluid h-100 w-100 object-fit-cover"
        />
      </div>

      {/* Right Background Shape */}
      <div
        className="position-absolute end-0 top-0 h-100"
        style={{
          width: '50%',
          overflow: 'hidden',
          clipPath: 'ellipse(60% 100% at 100% 50%)',
        }}
      >
        <img
          src={RightBg}
          alt="right-bg"
          className="img-fluid h-100 w-100 object-fit-cover"
        />
      </div>

      {/* Login Card */}
      <div
        className="position-relative z-3 rounded-4 p-5 w-100 text-white"
        style={{
          maxWidth: '420px',
          backgroundColor: '#315951E5', // green with opacity
        }}
      >
        {/* Logo */}
        {/* <div className="text-center mb-4">
          <img src={Logo} alt="PMS Logo" style={{ width: '120px' }} />
        </div> */}

        {/* Title */}
        <div className="mb-4 text-start">
          <p className="text-uppercase text-white-50 mb-1" style={{ fontSize: '0.85rem' }}>
            welcome to PMS
          </p>
          <h2 className="text-warning fw-bold" style={{ fontSize: '1.75rem' }}>
            Login
          </h2>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
