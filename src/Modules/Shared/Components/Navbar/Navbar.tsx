import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/images/Logo.png";
import DarkLogo from "../../../../assets/images/logoDark.png";
import notification from "../../../../assets/images/Notification 1.png";
import { AuthContext } from "../../../../Context/AuthContext";
import type { UserProfile } from "../../../../interfaces/ProfileInterface";
import { axiosInstance, imgURL, USERLIST } from "../../../../Services/url";
import { useTheme } from "../../../../Context/ThemeContext";

interface NavbarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ showSidebar, toggleSidebar }: NavbarProps) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const get_current_user = async () => {
    try {
      const response = await axiosInstance.get(USERLIST.Current_USER);
      setCurrentUser(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users.");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully!");
    auth?.saveLoginData();
  };

  useEffect(() => {
    get_current_user();
  }, []);

  return (
    <nav className="navbar navbar-expand-md bg-body shadow-sm px-3 py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <button
          className="btn bg-main-color d-md-none me-2 rounded-2"
          onClick={toggleSidebar}
        >
          <i
            className={`fa-solid ${
              showSidebar ? "fa-angle-down" : "fa-angle-left"
            } text-white`}
          ></i>
        </button>

        {theme === "light" ? (
          <img src={Logo} alt="Logo" className="logo-img" />
        ) : (
          <img src={DarkLogo} alt="dark-logo" className="logo-dark-img" />
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <button
                className="btn btn-sm p-2 rounded-circle"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <i className="fas fa-moon text-dark"></i>
                ) : (
                  <i className="fas fa-sun text-warning"></i>
                )}
              </button>
            </li>

            <li className="nav-item">
              <img
                src={notification}
                alt="Notification"
                className="notification-icon w-75"
              />
            </li>

            <li className="nav-item d-flex align-items-center gap-2 border-start ps-3 position-relative">
              <img
                src={
                  currentUser?.imagePath
                    ? `${imgURL}/${currentUser.imagePath}`
                    : "https://via.placeholder.com/150"
                }
                alt="User"
                className="rounded-circle border"
                width={40}
                height={40}
              />
              <div className="lh-sm d-none d-lg-block">
                <h6 className="mb-0 fw-semibold small text-truncate">
                  {auth?.loginData?.userName}
                </h6>
                <p className="mb-0 text-muted small text-truncate">
                  {auth?.loginData?.userEmail}
                </p>
              </div>

              <div className="dropdown">
                <i
                  className="fa-solid fa-angle-down text-secondary small ms-1"
                  role="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></i>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg mt-2 rounded-4 border-0"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center gap-2 fw-semibold text-secondary py-2 px-3 rounded-2 hover:bg-main-color-soft"
                      to="/dashboard/profile"
                    >
                      <i className="fa-regular fa-user text-main-color"></i>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 text-danger fw-semibold py-2 px-3 rounded-2"
                      onClick={logout}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
