import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
     let navigate=useNavigate()
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
