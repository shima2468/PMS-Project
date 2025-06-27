import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  emailValidation,
  otpValidation,
} from "../../../../Services/Vaildition";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import type { IverifyAccount } from "../../../../interfaces/AuthInterface";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IverifyAccount>({
    defaultValues: { email: location.state?.email },
  });

  const onSubmit: SubmitHandler<IverifyAccount> = async (data) => {
    try {
      const response = await axiosInstance.put(USERS_URLS.VERIFY, data);

      toast.success(
        response.data.message || "Account has been verified successfully"
      );
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to verify account. Please try again later."
      );
    }
  };
  return (
    <div className="verify-container px-5">
      <h1 className="text-warning fw-bold form-title mb-0">Verify Account</h1>
      <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-start">
          <label className="form-label mb-1 main-color" htmlFor="Email">
            E-mail
          </label>
          <div className="d-flex flex-column">
            <input
              id="Email"
              disabled
              type="email"
              placeholder="Enter your E-mail"
              className="form-control custom-input"
              {...register("email", emailValidation)}
            />
          </div>
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>
        <div className="mb-4 text-start">
          <label htmlFor="code" className="form-label mb-1">
            OTP Verification
          </label>
          <div className="d-flex flex-column">
            <input
              id="code"
              type="text"
              placeholder="Enter Verification"
              className="form-control custom-input"
              {...register("code", otpValidation)}
            />
          </div>
          {errors.code && (
            <small className="text-danger">{errors.code.message}</small>
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
  );
};

export default VerifyAccount;
