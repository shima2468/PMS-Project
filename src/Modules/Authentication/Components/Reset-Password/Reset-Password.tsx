import{ useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance, USERS_URLS } from '../../../../Services/url';
import toast from 'react-hot-toast';
import { ConfirmPassValidation, emailValidation, otpValidation, passValidation } from '../../../../Services/Vaildition';
interface formInputs {
  email: string;
  seed: string;
  password: string;
    confirmPassword: string;
}
const ResetPassword = () => {
     const navigate = useNavigate();
     const location = useLocation();
        const [firstVisible,setFirstVisible] = useState<boolean>(false);
   const [secondVisible,setSecondVisible] = useState<boolean>(false);
      const [loading, setLoading] = useState<boolean>(false);
      const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
  } = useForm<formInputs>({defaultValues:{email: location.state?.email}});
  const handleFirstVisible = () => {
     setFirstVisible(!firstVisible);
   }
   
   const handleSecondVisible = () => {
     setSecondVisible(!secondVisible);
   }
       // This effect is used to trigger validation for confirmPassword whenever password changes
   const passwordValue = watch('password');
   useEffect(() => {
    if (watch("confirmPassword")) {
       trigger("confirmPassword");
     }
  
   }, [passwordValue, trigger, watch]);
  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(USERS_URLS.RESET_PASSWORD, data);
   
      
      toast.success(response.data.message || 'Password has been reset successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to reset password. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };
    return (
       <>
        <h2 className="text-warning fw-bold form-title" style={{ fontSize: '1.75rem' }}>
             Reset  Password
              </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
             <div className="mb-4 text-start">
             <label
      className="form-label mb-1"
      style={{ color: '#EF9B28', fontWeight: '500' }}
    >
      E-mail
    </label>
    <div className="d-flex flex-column">
      <input
      disabled
        type="email"
        placeholder='Enter your E-mail' 
        className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
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
     <div className="mb-4 text-start">
             <label
      className="form-label mb-1"
      style={{ color: '#EF9B28', fontWeight: '500' }}
    >
      OTP Verification
    </label>
    <div className="d-flex flex-column">
      <input
        type="text"
        placeholder='Enter Verification' 
        className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
        style={{
          borderColor: '#ccc',
          color: 'white',
          boxShadow: 'none',
        }}
        {...register('seed', otpValidation)}
      />
    </div>
    {errors.seed && (
      <small className="text-danger">{errors.seed.message}</small>
    )}
    </div>
     <div className="mb-4 text-start">
             <label
      className="form-label mb-1"
      style={{ color: '#EF9B28', fontWeight: '500' }}
    >
     New Password
    </label>
    <div className="input-group">
      <input
       type={firstVisible? "text": "password"}
        placeholder='Enter your New Password' 
        className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
        style={{
          borderColor: '#ccc',
          color: 'white',
          boxShadow: 'none',
        }}
        {...register('password', passValidation)}
      />
         <div className="input-group-text bg-transparent border-0 text-white p-0  position-relative" onClick={handleFirstVisible}>
        {firstVisible? <i className="fa-solid fa-eye position-absolute"></i> : <i className="fa-solid fa-eye-slash position-absolute"></i>}
        </div>
    </div>
    {errors.password && (
      <small className="text-danger">{errors.password.message}</small>
    )}
    </div>
     <div className="mb-4 text-start">
             <label
      className="form-label mb-1"
      style={{ color: '#EF9B28', fontWeight: '500' }}
    >
      Confirm Password
    </label>
    <div className="input-group">
         <input type={secondVisible? "text": "password"} placeholder="Confirm Password"  className="form-control border-0 border-bottom rounded-0 bg-transparent text-white px-0"
        style={{
          borderColor: '#ccc',
          color: 'white',
          boxShadow: 'none',
        }}  
        {...register("confirmPassword",{
          required: {
            value: true,
            message: ConfirmPassValidation.required,
          },
          validate:{
           validate:(value) => value === watch("password") || ConfirmPassValidation.invalid
          } 
         })} />
           <div className="input-group-text bg-transparent border-0 text-white p-0 position-relative" onClick={handleSecondVisible}>
        {secondVisible? <i className="fa-solid fa-eye position-absolute"></i> : <i className="fa-solid fa-eye-slash position-absolute"></i>}
        </div>
    </div>
    {errors.confirmPassword && (
      <small className="text-danger">{errors.confirmPassword.message}</small>
    )}
    </div>
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
    {loading ? 'Saving...' : 'Save'}
  </button>
    </form>
        </>
    );
}

export default ResetPassword;
