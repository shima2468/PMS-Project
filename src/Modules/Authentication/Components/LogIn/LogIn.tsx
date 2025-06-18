import React, { useState, useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthContext";
import { emailValidation } from "../../../../Services/Vaildition";

interface formInputs {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { saveLoginData } = useContext(AuthContext)!;
  const [Visible, setVisible] = useState<boolean>(false);
  const handleVisible = () => {
    setVisible(!Visible);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="fw-bold form-title main-color">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-start  mb-3 border-0 border-bottom">
          <label className="form-label mb-1 main-color">E-mail</label>
          <div className="d-flex flex-column">
            <input
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
          <label className="form-label mb-1 main-color">Password</label>
          <div className="input-group mb-3 border-0 border-bottom">
            <input
              type={Visible ? "text" : "password"}
              placeholder="Enter your password"
              className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
              {...register("password", { required: "Password is required" })}
            />
            <div
              className="input-group-text bg-transparent border-0 text-white p-0  position-relative"
              onClick={handleVisible}
            >
              {Visible ? (
                <i className="fa-solid fa-eye position-absolute"></i>
              ) : (
                <i className="fa-solid fa-eye-slash position-absolute"></i>
              )}
            </div>
          </div>
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>

        <div className="d-flex justify-content-between mb-4">
          <button
            type="button"
            className="btn btn-link p-0 text-white text-decoration-none fs-6"
            onClick={() => navigate("/register")}
          >
            Register Now ?
          </button>

          <button
            type="button"
            className="btn btn-link p-0 text-white text-decoration-none fs-6"
            onClick={() => navigate("/forget-password")}
          >
            Forget Password ?
          </button>
        </div>

        <button
          type="submit"
          className=" w-100 bg-main-color text-white rounded-5 border-0 p-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LogIn;
