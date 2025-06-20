import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const MasterLayout = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <SideBar />
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
