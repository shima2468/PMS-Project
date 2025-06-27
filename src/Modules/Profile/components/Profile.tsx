import React, { useEffect, useState } from "react";
import type { UserProfile } from "../../../../src/interfaces/data";
import toast from "react-hot-toast";
import { axiosInstance, USERLIST, imgURL } from "../../../Services/url";
import { Audio } from "react-loader-spinner";
import "./Profile.css"; // تقدر تكمّله للتخصيص

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const showProfile = async () => {
    try {
      const response = await axiosInstance.get(USERLIST.Current_USER);
      setUser(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Audio height="100" width="100" color="#EF9B28" ariaLabel="loading" visible />
      </div>
    );
  }

  return (
    <div className="profile-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="profile-card bg-white rounded-4 shadow p-4 p-md-5 mx-auto" style={{ maxWidth: "800px" }}>
          <div className="text-center mb-4">
            <img
              src={user?.imagePath ? `${imgURL}/${user.imagePath}` : "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle shadow-sm border"
              style={{ width: "140px", height: "140px", objectFit: "cover" }}
            />
            <h3 className="fw-bold mt-3 mb-1">{user?.userName}</h3>
            <span className="text-muted">{user?.group?.name}</span>
          </div>

          <hr className="my-4" />

          <div className="row gy-4">
            <ProfileField label="Email" value={user?.email} />
            <ProfileField label="Phone" value={user?.phoneNumber} />
            <ProfileField label="Country" value={user?.country} />
            <ProfileField
              label="Status"
              value={
                <span className={`badge rounded-pill px-3 py-2 fs-6 ${user?.isActivated ? "bg-success" : "bg-danger"}`}>
                  {user?.isActivated ? "Active" : "Inactive"}
                </span>
              }
            />
            <div className="col-12">
              <label className="text-muted small">Created At</label>
              <p className="fw-semibold mb-0">
                {user?.creationDate ? new Date(user.creationDate).toLocaleDateString("en-GB") : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="col-md-6">
    <label className="text-muted small">{label}</label>
    <p className="fw-semibold mb-0">{value}</p>
  </div>
);

export default Profile;
