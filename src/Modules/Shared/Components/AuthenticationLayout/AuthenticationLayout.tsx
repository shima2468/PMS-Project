import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LeftBgLogin from "../../../../assets/images/LeftBg.png";
import rightBgLogin from "../../../../assets/images/Login.png";
import rightBgRegister from "../../../../assets/images/ResetPass.png";
import rightBgForget from "../../../../assets/images/ForgetPass.png";
import rightBgReset from "../../../../assets/images/ResetPass.png";
import rightBgChange from "../../../../assets/images/ChangePass.png";
import ResetPassBgLeft from "../../../../assets/images/ResetPassLeft.png";
import RegisterBgLeft from "../../../../assets/images/ResetPassLeft.png";
import ChangePassBgLeft from "../../../../assets/images/ChangePassLeft.png";
import ForgetPassBgLeft from "../../../../assets/images/ForgetPassLeft.png";
import VerifyBgLeft from "../../../../assets/images/ForgetPassLeft.png";
import Logo from "../../../../assets/images/PMS 3.png"
const AuthenticationLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  let rightBg;
  let LeftBg;

  if (path.includes("register")) {
    rightBg = rightBgRegister;
    LeftBg = RegisterBgLeft;
  } else if (path.includes("forget-password")) {
    rightBg = rightBgForget;
    LeftBg = ForgetPassBgLeft;
  } else if (path.includes("reset-password")) {
    rightBg = rightBgReset;
    LeftBg = ResetPassBgLeft;
  } else if (path.includes("change-password")) {
    rightBg = rightBgChange;
    LeftBg = ChangePassBgLeft;
  } else if (path.includes("verify-account")) {
    rightBg = rightBgChange;
    LeftBg = VerifyBgLeft;
  } else {
    rightBg = rightBgLogin; // default login
    LeftBg = LeftBgLogin;
  }
  return (
    <div
      className="auth-container min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{ backgroundColor: "#0E382F" }}
    >
      {/* Left Background Shape */}
      <div className="position-absolute start-0 bottom-0 h-75">
        <img src={LeftBg} alt="left-bg" className="h-100" />
      </div>

      {/* Right Background Shape */}
      <div className="position-absolute end-0 top-0 h-100">
        <img src={rightBg} alt="right-bg" className="h-100" />
      </div>
      <div className="row justify-content-center align-items-center z-3">
        {/* Logo */}
        <div className="text-center mb-4">
          <img src={Logo} alt="PMS Logo" />
        </div>

        {/* Login Card */}
        <div className="col-md-12">
          <div
            className=" rounded-4 p-5 text-white mx-2"
            style={{
              background: "#315951E5", // green with opacity
            }}
          >
            {/* Title */}

            <p
              className="text-uppercase text-white mb-1"
              style={{ fontSize: "0.85rem" }}
            >
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
