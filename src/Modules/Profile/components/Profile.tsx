import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import type { UserProfile } from "../../../interfaces/ProfileInterface";
import { axiosInstance, imgURL, USERLIST } from "../../../Services/url";

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
        <Audio
          height="100"
          width="100"
          color="#EF9B28"
          ariaLabel="loading"
          visible
        />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="main-Stroke rounded-4 p-4">
              <div className="card rounded-4 shadow-sm border-0 text-center pt-5 position-relative p-3">
                <div className="position-absolute top-0 start-50 translate-middle">
                  <img
                    src={
                      user?.imagePath
                        ? `${imgURL}/${user.imagePath}`
                        : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="rounded-circle border border-3 border-white shadow-sm"
                    width="120"
                    height="120"
                  />
                </div>

                {/* بيانات المستخدم */}
                <div className="card-body pt-3">
                  <h4 className="fw-bold mb-1">{user?.userName}</h4>
                  <p className="text-muted">{user?.group?.name}</p>

                  <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
                    <span className="badge bg-warning-subtle text-dark">
                      {user?.email}
                    </span>
                    <span
                      className={`badge ${
                        user?.isActivated ? "bg-main-color" : "bg-danger"
                      }`}
                    >
                      {user?.isActivated ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <ul className="list-group list-group-flush text-start">
                    <li className="list-group-item">
                      <strong>Phone:</strong> {user?.phoneNumber}
                    </li>
                    <li className="list-group-item">
                      <strong>Country:</strong> {user?.country}
                    </li>
                    <li className="list-group-item">
                      <strong>Created At:</strong>{" "}
                      {user?.creationDate
                        ? new Date(user.creationDate).toLocaleDateString(
                            "en-GB"
                          )
                        : "N/A"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
