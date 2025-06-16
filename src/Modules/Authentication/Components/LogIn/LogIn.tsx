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
  const [showPassword, setShowPassword] = useState(false);

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
  {/* Email Field */}
  <div className="mb-4">
    <label
      className="form-label mb-1"
      style={{ color: '#EF9B28', fontWeight: '500' }}
    >
      Email
    </label>
    <div className="d-flex flex-column">
      <span style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '2px' }}>
        Enter your E-mail
      </span>
      <input
        type="email"
        className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
        style={{
          borderColor: '#ccc',
          color: 'white',
          boxShadow: 'none',
        }}
        {...register('email', { required: 'Email is required' })}
      />
    </div>
    {errors.email && (
      <small className="text-danger">{errors.email.message}</small>
    )}
  </div>

  {/* Password Field */}
  <div className="mb-4">
    <label
      className="form-label mb-1"
      style={{ color: '#EF9B28', fontWeight: '500' }}
    >
      Password
    </label>
    <div className="d-flex flex-column">
      <span style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '2px' }}>
        Enter your password
      </span>
      <input
        type="password"
        className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
        style={{
          borderColor: '#ccc',
          color: 'white',
          boxShadow: 'none',
        }}
        {...register('password', { required: 'Password is required' })}
      />
    </div>
    {errors.password && (
      <small className="text-danger">{errors.password.message}</small>
    )}
  </div>

  {/* Bottom Actions */}
  <div className="d-flex justify-content-between mb-4 text-white-50" style={{ fontSize: '0.875rem' }}>
    <span>Register Now ?</span>
    <span>Forget Password ?</span>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="btn w-100"
    style={{
      backgroundColor: '#EF9B28',
      color: 'white',
      borderRadius: '25px',
      padding: '10px',
    }}
    disabled={loading}
  >
    {loading ? 'Logging in...' : 'Login'}
  </button>
</form>


  );
};

export default LogIn;
