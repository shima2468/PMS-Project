import React, { useState, useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthContext";
import { emailValidation } from "../../../../Services/Vaildition";

interface formInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { saveLoginData } = useContext(AuthContext)!;
  const [Visible, setVisible] = useState<boolean>(false);
  const handleVisible = () => {
    setVisible(!Visible);
  };

  const {
    register,
    formState: { errors , isSubmitting},
    handleSubmit,
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try { 
    
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } 
  };

  return (
    <>
      <div className="px-5 pb-5 card-auth-container" >
        <h1 className="fw-bold form-title main-color">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-start  mb-3 border-0 border-bottom">
          <label htmlFor="Email" className="form-label mb-1 main-color">E-mail</label>
          <div className="d-flex flex-column">
            <input
            id="Email"
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
          <label htmlFor="Password" className="form-label mb-1 main-color">Password</label>
          <div className="input-group mb-3 border-0 border-bottom">
            <input
            id="Password"
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
          <Link
            type="button"
            className="btn btn-link p-0 text-white text-decoration-none fs-6"
            to={"/register"}
          >
            Register Now ?
          </Link>

          <Link
            type="button"
            className="btn btn-link p-0 text-white text-decoration-none fs-6"
            to={"/forget-password"}
          >
            Forget Password ?
          </Link>
        </div>

        <button
          type="submit"
          className=" w-100 bg-main-color text-white rounded-5 border-0 p-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      </div>
      
    </>
  );
};

export default Login;
