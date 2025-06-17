import React, { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="register-container text-white">
      <h2
        className="text-warning fw-bold form-title"
        style={{ fontSize: "1.75rem" }}
      >
        Forget Password
      </h2>
      <img
        src="https://i.pravatar.cc/100"
        alt="avatar"
        className="avatar-img mb-4"
      />

      <form>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label text-warning">User Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control custom-input"
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-warning">Country</label>
              <input
                type="text"
                placeholder="Enter your country"
                className="form-control custom-input"
              />
            </div>

            <div className="mb-4 position-relative">
              <label className="form-label text-warning">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="form-control custom-input"
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } password-toggle`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label text-warning">E-mail</label>
              <input
                type="email"
                placeholder="Enter your E-mail"
                className="form-control custom-input"
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-warning">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="form-control custom-input"
              />
            </div>

            <div className="mb-4 position-relative">
              <label className="form-label text-warning">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm New Password"
                className="form-control custom-input"
              />
              <i
                className={`fa-solid ${
                  showConfirm ? "fa-eye" : "fa-eye-slash"
                } password-toggle`}
                onClick={() => setShowConfirm(!showConfirm)}
              ></i>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100 mt-3 rounded-pill"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Register;
