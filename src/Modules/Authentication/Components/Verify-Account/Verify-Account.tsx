
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import toast from "react-hot-toast";
import {
  emailValidation,
  otpValidation,
} from "../../../../Services/Vaildition";
interface formInputs {
  email: string;
  code: string;
}
const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors , isSubmitting},
    handleSubmit,
  } = useForm<formInputs>({ defaultValues: { email: location.state?.email } });

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      const response = await axiosInstance.put(USERS_URLS.VERIFY, data);

      toast.success(
        response.data.message || "Account has been verified successfully"
      );
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <label
            className="form-label mb-1"
            style={{ color: "#EF9B28", fontWeight: "500" }}
            htmlFor="Email"
          >
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
          <label htmlFor="code" className="form-label mb-1">OTP Verification</label>
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
          className="btn w-100"
          style={{
            backgroundColor: "#EF9B28",
            color: "white",
            borderRadius: "25px",
            padding: "10px",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
