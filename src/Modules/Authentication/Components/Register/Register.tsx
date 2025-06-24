import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  emailValidation,
  passValidation,
  requiredValidation,
} from "../../../../Services/Vaildition";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import toast from "react-hot-toast";

interface registerFormInputs {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
}

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
    trigger,
  } = useForm<registerFormInputs>({
    mode: "onChange",
  });
  const password = watch("password");
  const avatarFile = watch("profileImage")?.[0];
  const avatarUrl = avatarFile
    ? URL.createObjectURL(avatarFile)
    : "https://i.pravatar.cc/100";

  useEffect(() => {
    return () => {
      if (avatarFile) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarFile]);

  useEffect(() => {
    trigger("confirmPassword");
  }, [password]);
  const onSubmit: SubmitHandler<registerFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }
    try {
      const response = await axiosInstance.post(USERS_URLS.REGISTER, formData);
      toast.success(
        response.data.message || "you are successfully registered!"
      );
      navigate("/verify-account", {
        state: { email: data.email },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register");
    }
  };
  return (
    <div className="register-container text-white mb-5">
      <h2 className="main-color fw-bold form-title">Create New Account</h2>
      <div className="d-flex flex-column align-items-center justify-content-center ">
        <label htmlFor="avatar-upload">
          <img
            src={
              watch("profileImage")?.[0]
                ? URL.createObjectURL(watch("profileImage")[0])
                : "https://i.pravatar.cc/100"
            }
            alt="avatar"
            className="avatar-img mb-4"
          />
        </label>

        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          {...register("profileImage")}
          className="d-none"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-md-6 px-5 d-flex flex-column gap-3">
            <div className="mb-1" style={{ minHeight: "90px" }}>
              <label className="form-label main-color">User Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control custom-input"
                {...register("userName", requiredValidation)}
              />
              {errors.userName && (
                <small className="text-danger">{errors.userName.message}</small>
              )}
            </div>

            <div className="mb-1" style={{ minHeight: "90px" }}>
              <label className="form-label main-color">Country</label>
              <input
                type="text"
                placeholder="Enter your country"
                className="form-control custom-input"
                {...register("country", requiredValidation)}
              />
              {errors.country && (
                <small className="text-danger">{errors.country.message}</small>
              )}
            </div>

            <div className="position-relative">
              <label className="form-label main-color">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="form-control custom-input"
                {...register("password", passValidation)}
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } password-toggle`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* Right Column */}
          <div className="col-md-6 px-5 d-flex flex-column gap-3">
            <div className="mb-1" style={{ minHeight: "90px" }}>
              <label className="form-label main-color">E-mail</label>
              <input
                type="email"
                placeholder="Enter your E-mail"
                className="form-control custom-input"
                {...register("email", emailValidation)}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            <div className="mb-1" style={{ minHeight: "90px" }}>
              <label className="form-label main-color">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="form-control custom-input"
                {...register("phoneNumber", requiredValidation)}
              />
              {errors.phoneNumber && (
                <small className="text-danger">
                  {errors.phoneNumber.message}
                </small>
              )}
            </div>

            <div className="position-relative">
              <label className="form-label main-color">Confirm Password</label>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm New Password"
                className="form-control custom-input"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <i
                className={`fa-solid ${
                  showConfirm ? "fa-eye" : "fa-eye-slash"
                } password-toggle`}
                onClick={() => setShowConfirm(!showConfirm)}
              ></i>
            </div>
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          {/* Submit Button Full Width */}
          <div className="col-12 d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="border-0 text-white w-50 px-3 py-2 bg-main-color rounded-5 "
              disabled={isSubmitting}
            >
              {isSubmitting ? "loading ..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
