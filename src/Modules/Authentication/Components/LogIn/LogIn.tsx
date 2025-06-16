import React, { useState, useContext } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, USERS_URLS } from '../../../../Services/url';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthContext';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { saveLoginData } = useContext(AuthContext)!;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      localStorage.setItem('token', response.data.token);
      saveLoginData();
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <small className="text-danger">{errors.email.message}</small>}
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <small className="text-danger">{errors.password.message}</small>}
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LogIn;
