import React, { useEffect, useState } from "react";
import type { UserProfile } from "../../../../src/interfaces/data";
import toast from "react-hot-toast";
import { axiosInstance, USERLIST } from "../../../Services/url";
import "./Profile.css";
import { imgURL } from "../../../Services/url";
import { Audio } from "react-loader-spinner";

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showProfile = async () => {
    try {
      const response = await axiosInstance.get(USERLIST.Current_USER);
      setUser(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Audio
          height="100"
          width="100"
          color="rgba(239, 155, 40, 1)"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="profile-page py-5 bg-light min-vh-100">
      <div className="container">
        <div
          className="profile-container card-container shadow-lg rounded-4 p-5 mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <div className="text-center mb-4">
            <img
              src={
                user?.imagePath
                  ? `${imgURL}/${user.imagePath}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="rounded-circle shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h2 className="fw-bold mt-3">{user?.userName}</h2>
            <span className="text-secondary">{user?.group?.name}</span>
          </div>

          <hr className="my-4" />

          <div className="row text-start">
            <div className="col-md-6 mb-4">
              <label className="form-label text-muted">Email</label>
              <p className="fw-semibold mb-0">{user?.email}</p>
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label text-muted">Phone</label>
              <p className="fw-semibold mb-0">{user?.phoneNumber}</p>
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label text-muted">Country</label>
              <p className="fw-semibold mb-0">{user?.country}</p>
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label text-muted">Status</label>
              <p className="mb-0">
                <span
                  className={`badge rounded-pill px-3 py-2 fs-6 ${
                    user?.isActivated ? "bg-success" : "bg-danger"
                  }`}
                >
                  {user?.isActivated ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
            <div className="col-12">
              <label className="form-label text-muted">Created At</label>
              <p className="fw-semibold mb-0">
                {user?.creationDate
                  ? new Date(user.creationDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
