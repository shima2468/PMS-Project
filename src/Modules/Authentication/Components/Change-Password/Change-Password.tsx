import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  ConfirmPassValidation,
  passValidation,
} from "../../../../Services/Vaildition";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import toast from "react-hot-toast";
import type { IchangePassword } from "../../../../interfaces/AuthInterface";

const ChangePassword = () => {
  const [isOldPasswordVisible, setIsOldPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<IchangePassword>();
  const onSubmit: SubmitHandler<IchangePassword> = async (data) => {
    try {
      const response = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, {
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
        confirmNewPassword: data?.confirmNewPassword,
      });

      toast.success(
        response?.data?.message || "Password changed successfully!"
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    }
  };

  const newPasswordValue = watch("newPassword");
  const confirmNewPasswordValue = watch("confirmNewPassword");

  useEffect(() => {
    if (confirmNewPasswordValue) {
      trigger("newPassword");
    }
  }, [newPasswordValue, confirmNewPasswordValue, trigger, watch]);

  return (
    <div className="change-pass-container px-5 pb-5">
      <div className="heading">
        <h1 className="form-title main-color">Change Password</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="mb-3 border-0 border-bottom old-password">
          <label htmlFor="old-Password" className="d-block main-color">
            Old Password
          </label>
          <div className="d-flex justify-content-between align-items-center pb-3">
            <input
              type={isOldPasswordVisible ? "text" : "password"}
              className=" border-0 bg-transparent text-white  text-start"
              placeholder="Enter your Old Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="old-Password"
              {...register("oldPassword", passValidation)}
            />
            <button
              className="input-group-text bg-transparent border-0"
              onClick={() => setIsOldPasswordVisible((prev) => !prev)}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
            >
                  <span className="sr-only">{isOldPasswordVisible?'Hide Password' : 'Show Password'}</span>
              
              <i
                className={`fa-solid ${
                  isOldPasswordVisible ? "fa-eye" : "fa-eye-slash"
                } text-white `}
                aria-hidden="true"
              ></i>
            </button>
          </div>
          {errors.oldPassword && (
            <small className="text-danger">
              {errors?.oldPassword?.message}
            </small>
          )}
        </div>
        <div className="mb-3 border-0 border-bottom new-password">
          <label htmlFor="New-Password" className="d-block main-color">
            New Password
          </label>
          <div className="d-flex justify-content-between align-items-center pb-3">
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              className=" border-0 bg-transparent text-white  text-start"
              placeholder="Enter your New Password"
              aria-label="Username"
              id="New-Password"
              {...register("newPassword", passValidation)}
            />
            <button
              className="input-group-text bg-transparent border-0"
              onClick={() => setIsNewPasswordVisible((prev) => !prev)}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
            >
                  <span className="sr-only">{isNewPasswordVisible?'Hide Password' : 'Show Password'}</span>

              <i
              
                className={`fa-solid ${
                  isNewPasswordVisible ? "fa-eye" : "fa-eye-slash"
                } text-white `}
                aria-hidden="true"
              ></i>
            </button>
          </div>
          {errors.newPassword && (
            <small className="text-danger">
              {errors?.newPassword?.message}
            </small>
          )}
        </div>
        <div className="mb-3 border-0 border-bottom conformationNew-password">
          <label htmlFor="old-Password" className="d-block main-color">
            Confirm Password
          </label>
          <div className="d-flex justify-content-between align-items-center pb-3">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              className=" border-0 bg-transparent text-white text-start"
              placeholder="Confirm New Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="confirm-New-Password"
              {...register("confirmNewPassword", {
                required: {
                  value: true,
                  message: ConfirmPassValidation.required,
                },
                validate: (value) =>
                  value == watch("newPassword") ||
                  ConfirmPassValidation.invalid,
              })}
            />
            <button
              className="input-group-text bg-transparent border-0"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
            >
                  <span className="sr-only">{isConfirmPasswordVisible ?'Hide Password' : 'Show Password'}</span>
              <i
                className={`fa-solid ${
                  isConfirmPasswordVisible ? "fa-eye" : "fa-eye-slash"
                } text-white `}
                aria-hidden="true"
              ></i>
            </button>
          </div>
          {errors.confirmNewPassword && (
            <small className="text-danger">
              {errors?.confirmNewPassword?.message}
            </small>
          )}
        </div>
        <button
          className="border-0  text-white w-100 p-3 bg-main-color rounded-5 mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Change Password...." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
