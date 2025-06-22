import React, { useEffect, useState } from "react";
import type {UserProfile } from '../../../../src/interfaces/data'
import toast from "react-hot-toast";
import { axiosInstance, USERLIST } from "../../../Services/url";
import './Profile.css'

const Profile: React.FC = ()=>
{

    const [user , setUser] = useState<UserProfile | null> (null);


    const showProfile = async ()=>{

        try{
            const response = await axiosInstance.get(USERLIST.Current_USER);
            setUser (response.data);
        }

        catch(error:any)
        {
            toast.error(error.response?.data?.message || 'Failed to fetch users.');
        }
    }

    useEffect(()=>{
    showProfile()
    },[])

return (
<div className="profile-page py-5">
  <div className="profile-container bg-white shadow rounded-4 p-4 mx-auto">
    {user ? (
      <>
        <div className="text-center">
          <img
            src={
              user.imagePath
                ? `https://upskilling-egypt.com:3003/${user.imagePath}`
                : 'https://via.placeholder.com/150'
            }
            alt="Profile"
            className="profile-img mb-3"
          />
          <h2 className="fw-bold">{user.userName}</h2>
          <p className="text-muted">{user.group.name}</p>
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label className="text-muted">Email</label>
            <p className="fw-semibold">{user.email}</p>
          </div>
          <div className="col-md-6 mb-3">
            <label className="text-muted">Phone</label>
            <p className="fw-semibold">{user.phoneNumber}</p>
          </div>
          <div className="col-md-6 mb-3">
            <label className="text-muted">Country</label>
            <p className="fw-semibold">{user.country}</p>
          </div>
          <div className="col-md-6 mb-3">
            <label className="text-muted">Status</label>
            <p>
              <span className={`badge px-3 py-1 ${user.isActivated ? 'bg-success' : 'bg-danger'}`}>
                {user.isActivated ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
          <div className="col-12 mb-2">
            <label className="text-muted">Created At</label>
            <p className="fw-semibold">{new Date(user.creationDate).toLocaleDateString('en-GB')}</p>
          </div>
        </div>
      </>
    ) : (
      <p className="text-center m-0">No user data found.</p>
    )}
  </div>
</div>


);


}
export default Profile;