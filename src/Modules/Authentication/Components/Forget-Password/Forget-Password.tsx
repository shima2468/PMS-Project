import{ useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, USERS_URLS } from '../../../../Services/url';
import toast from 'react-hot-toast';
import { emailValidation } from '../../../../Services/Vaildition';

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
      const response = await axiosInstance.post(USERS_URLS.FORGET_PASSWORD, data);
      
      toast.success(response.data.message || 'Verification email sent successfully!');
      navigate('/reset-password', {
        state: { email: data.email }});
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to send verification email. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
    return (
        <>
        <h2 className="text-warning fw-bold form-title" style={{ fontSize: '1.75rem' }}>
             Forget Password
              </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
             <div className="mb-4 text-start">
             <label
      className="form-label mb-1"
      style={{ color: 'rgba(239, 155, 40, 1)', fontWeight: '500' }}
    >
      E-mail
    </label>
    <div className="d-flex flex-column">
      <input
        type="email"
        placeholder='Enter your E-mail' 
        className="form-control border-0 border-bottom rounded-0 bg-transparent  px-0"
        style={{
          borderColor: '#ccc',
          color: 'white',
          boxShadow: 'none',
        }}
        {...register('email', emailValidation)}
      />
    </div>
    {errors.email && (
      <small className="text-danger">{errors.email.message}</small>
    )}
    </div>
      <button
    type="submit"
    className="btn w-100"
    style={{
      backgroundColor: 'rgba(239, 155, 40, 1)',
      color: 'white',
      borderRadius: '25px',
      padding: '10px',
    }}
    disabled={loading}
  >
    {loading ? 'Verifying...' : 'Verify'}
  </button>
    </form>
        </>
    );
}

export default ForgetPassword;
