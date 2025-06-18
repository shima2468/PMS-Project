import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import toast from "react-hot-toast";
import { emailValidation } from "../../../../Services/Vaildition";

interface formInputs {
  email: string;
}
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        USERS_URLS.FORGET_PASSWORD,
        data
      );

      toast.success(
        response.data.message || "Verification email sent successfully!"
      );
      navigate("/reset-password", {
        state: { email: data.email },
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h2 className="main-color fw-bold form-title">Forget Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-start">
          <label className="form-label mb-1 main-color">E-mail</label>
          <div className="d-flex flex-column  mb-3 border-0 border-bottom">
            <input
              type="email"
              placeholder="Enter your E-mail"
              className="form-control border-0 border-bottom rounded-0 bg-transparent  px-0"
              {...register("email", emailValidation)}
            />
          </div>
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>
        <button
          type="submit"
          className=" w-100 bg-main-color text-white rounded-5 border-0 p-3"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
