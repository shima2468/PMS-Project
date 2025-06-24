import { useContext, useEffect, useState } from "react";
import Logo from "../../../../assets/images/Logo.png";
import notification from "../../../../assets/images/Notification 1.png";
// import userImg from "../../../../assets/images/UserImg.png";
import { AuthContext } from "../../../../Context/AuthContext";
import type {UserProfile} from '../../../../interfaces/data';
import toast from "react-hot-toast";
import { axiosInstance, imgURL, USERLIST } from "../../../../Services/url";

interface NavbarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}



const Navbar = ({ showSidebar, toggleSidebar }: NavbarProps) => {
  const auth = useContext(AuthContext);

const [currentUser , setCurrentUser] = useState<UserProfile | null> (null);

const get_current_user = async()=>{

  try{
    const response = await axiosInstance.get(USERLIST.Current_USER);
    setCurrentUser(response.data)
  }

  catch(error:any)
  {
    toast.error(error.response?.data?.message || 'Failed to fetch users.');
  }

}

useEffect(()=>{
  get_current_user()
},[])

  

  return (
    <nav className="navbar navbar-expand-md bg-white px-3 py-2 shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        <button className="btn bg-main-color d-md-none me-2 rounded-2" onClick={toggleSidebar}>
          <i className={`fa-solid ${showSidebar ? "fa-angle-down" : "fa-angle-left"} text-white`}></i>
        </button>

        <img src={Logo} alt="Logo" className="logo-img" />

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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <img src={notification} alt="Notification" className="notification-icon w-75" />
            </li>
            <li className="nav-item d-flex flex-m-row align-items-center gap-2 border-start ps-3">
              <img src={currentUser?.imagePath?`${imgURL}/${currentUser.imagePath}`: 'https://via.placeholder.com/150'} alt="User" className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
              <div className="lh-sm">
                <h6 className="mb-0 fw-semibold small">{auth?.loginData?.userName}</h6>
                <p className="mb-0 text-muted small">{auth?.loginData?.userEmail}</p>
              </div>
              <i className="fa-solid fa-angle-down text-secondary small"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
