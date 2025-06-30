import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ConfirmPassValidation,
  emailValidation,
  otpValidation,
  passValidation,
} from "../../../../Services/Vaildition";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import type { IResetPassword } from "../../../../interfaces/AuthInterface";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstVisible, setFirstVisible] = useState<boolean>(false);
  const [secondVisible, setSecondVisible] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<IResetPassword>({
    defaultValues: { email: location.state?.email },
  });
  const handleFirstVisible = () => {
    setFirstVisible(!firstVisible);
  };

  const handleSecondVisible = () => {
    setSecondVisible(!secondVisible);
  };
  const passwordValue = watch("password");
  useEffect(() => {
    if (watch("confirmPassword")) {
      trigger("confirmPassword");
    }
  }, [passwordValue, trigger, watch]);
  const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
    try {
      const response = await axiosInstance.post(
        USERS_URLS.RESET_PASSWORD,
        data
      );

      toast.success(
        response.data.message || "Password has been reset successfully"
      );
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password. Please try again later."
      );
    }
  };
  return (
    <>
      <div className="px-5 pb-5">
        <h1 className="main-color fw-bold form-title">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-start">
            <label htmlFor="Email" className="form-label mb-1 main-color">
              E-mail
            </label>
            <div className="d-flex flex-column mb-3 border-0 border-bottom">
              <input
                id="Email"
                disabled
                type="email"
                placeholder="Enter your E-mail"
                className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
                {...register("email", emailValidation)}
              />
            </div>
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
          <div className="mb-4 text-start">
            <label htmlFor="Otp" className="form-label mb-1 main-color">
              OTP Verification
            </label>
            <div className="d-flex flex-column mb-3 border-0 border-bottom">
              <input
                id="Otp"
                type="text"
                placeholder="Enter Verification"
                className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
                {...register("seed", otpValidation)}
              />
            </div>
            {errors.seed && (
              <small className="text-danger">{errors.seed.message}</small>
            )}
          </div>
          <div className="mb-4 text-start">
            <label htmlFor="Password" className="form-label mb-1 main-color">
              New Password
            </label>
            <div className="input-group mb-3 border-0 border-bottom">
              <input
                id="Password"
                type={firstVisible ? "text" : "password"}
                placeholder="Enter your New Password"
                className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
                {...register("password", passValidation)}
              />
              <div
                className="input-group-text bg-transparent border-0 text-white p-0  position-relative"
                onClick={handleFirstVisible}
              >
                 <span className="sr-only">{firstVisible?'Hide Password' : 'Show Password'}</span>
                  <i className={`fa-solid ${firstVisible ? 'fa-eye' : 'fa-eye-slash'} position-absolute`}></i>
              </div>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          <div className="mb-4 text-start">
            <label htmlFor="Email" className="form-label mb-1 main-color">
              Confirm Password
            </label>
            <div className="input-group mb-3 border-0 border-bottom">
              <input
                type={secondVisible ? "text" : "password"}
                placeholder="Confirm Password"
                className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: ConfirmPassValidation.required,
                  },
                  validate: {
                    validate: (value) =>
                      value === watch("password") ||
                      ConfirmPassValidation.invalid,
                  },
                })}
              />
              <div
                className="input-group-text bg-transparent border-0 text-white p-0 position-relative"
                onClick={handleSecondVisible}
              >
               <span className="sr-only">{secondVisible?'Hide Password' : 'Show Password'}</span>
                  <i className={`fa-solid ${secondVisible ? 'fa-eye' : 'fa-eye-slash'} position-absolute`}></i>
              </div>
            </div>
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="border-0  text-white w-100 p-3 bg-main-color rounded-5 mt-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
