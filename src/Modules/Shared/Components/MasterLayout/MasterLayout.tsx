import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const MasterLayout = () => {
  return (
    <div className="d-flex">
      <div className=" position-sticky top-0  vh-100 "> 
         <SideBar />
         </div>
        <div className="w-100">
           <Navbar />
          <Outlet />
        </div>
    </div>
  );
};

export default MasterLayout;
