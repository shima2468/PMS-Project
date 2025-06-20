import { useContext } from "react";
import Logo from "../../../../assets/images/Logo.png";
import notification from "../../../../assets/images/Notification 1.png";
import userImg from "../../../../assets/images/UserImg.png";
import { AuthContext } from "../../../../Context/AuthContext";

const Navbar = () => {
    const auth = useContext(AuthContext);

    
  return (
    <div className="custom-navbar d-flex justify-content-between align-items-center bg-white px-4 py-2 ">
      <img src={Logo} alt="Logo" className="logo-img img-fluid" />
      <div className="d-flex align-items-center gap-4">
        <img
          src={notification}
          alt="Notification"
          className="notification-icon img-fluid"
        />
        <div className="d-flex align-items-center gap-2 border-start border-start-3 ps-2"> 
          <img src={userImg} alt="User" className="user-img rounded-circle" />
          <div className="lh-sm ">
            <h6 className="mb-0 fw-semibold small">{auth?.loginData?.userName}</h6>
            <p className="mb-0 text-muted small">{auth?.loginData?.userEmail}</p>
          </div>
          <i className="fa-solid fa-angle-down text-secondary small dropdown-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
