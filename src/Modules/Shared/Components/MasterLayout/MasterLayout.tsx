import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const MasterLayout = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

      <div className="d-flex flex-grow-1 w-100" style={{ flex: 1 }}>
        {/* Sidebar for md and up */}
        {showSidebar && window.innerWidth >= 768 && (
          <div className="sidebar-wrapper">
            <SideBar
              showSidebar={showSidebar}
              toggleSidebar={toggleSidebar}
            />
          </div>
        )}

        {/* Overlay sidebar for small screens */}
        {showSidebar && window.innerWidth < 768 && (
          <>
            <div className="sidebar-overlay-popup">
              <SideBar
                showSidebar={showSidebar}
                toggleSidebar={toggleSidebar}
              />
            </div>
            <div
              className="sidebar-overlay-backdrop"
              onClick={toggleSidebar}
            ></div>
          </>
        )}

        {/* Main Page Content */}
        <div className="flex-grow-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
