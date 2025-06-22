import  { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
     const navigate=useNavigate();
    useEffect(() => {
    localStorage.removeItem('token');
    navigate("login")
    toast.success("Logged out successfully!")
  }, [])
    return (
        <div>
             
        </div>
    );
}

export default LogOut;
