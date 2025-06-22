import React, { useEffect, useState } from "react";
import type {UserProfile } from '../../../../src/interfaces/data'
import toast from "react-hot-toast";
import { axiosInstance, USERLIST } from "../../../Services/url";

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
  <div className="container my-5">
    <div className="card shadow-sm p-4">
      {user ? (
        <div className="d-flex align-items-center gap-4">
          <img
            src={
              user.imagePath
                ? `https://upskilling-egypt.com:3003/${user.imagePath}`
                : 'https://via.placeholder.com/150'
            }
            alt="Profile"
            className="rounded-circle"
            width={120}
            height={120}
          />
          <div>
            <h4>{user.userName}</h4>
            <p className="mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="mb-1"><strong>Phone:</strong> {user.phoneNumber}</p>
            <p className="mb-1"><strong>Country:</strong> {user.country}</p>
            <p className="mb-1"><strong>Group:</strong> {user.group.name}</p>
            <p className="mb-1">
              <strong>Status:</strong>{' '}
              <span className={`badge ${user.isActivated ? 'bg-success' : 'bg-danger'}`}>
                {user.isActivated ? 'Active' : 'Inactive'}
              </span>
            </p>
            <p className="mb-0">
              <strong>Created At:</strong>{' '}
              {new Date(user.creationDate).toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center m-0">No user data found.</p> // أو ممكن تخليها spinner أو تسيبها فاضية
      )}
    </div>
  </div>
);


}
export default Profile;