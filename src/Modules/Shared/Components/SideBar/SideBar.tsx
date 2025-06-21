import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const [isCollapsable, setIsCollapsable] = useState(false);
  const toggleCollapse = () => setIsCollapsable(!isCollapsable);
  const location = useLocation();
  const isActive = (path: any) => {
    return location.pathname === path;
  };
  const activeClass = "active-sidebar-item";
  return (
    <>
      <div className="position-sticky top-0 vh-100 sidebar-cont text-white">
        <div className="position-relative">
          <Sidebar collapsed={isCollapsable}>
            <Menu>
              <MenuItem>
                <button
                  className="position-absolute top-0 end-0 mt-2 me-n2 arrow-sideBar p-2 rounded-start-4 border-0"
                  onClick={toggleCollapse}
                >
                  <i className="fa-solid fa-angle-left fs-4 text-white"></i>
                </button>
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-home"></i>}
                component={<Link to="/dashboard" />}
                className={`${
                  isActive("/dashboard") ? activeClass : ""
                } mt-4 sidebar-logo`}
              >
                Home
              </MenuItem>

              <MenuItem
                icon={<i className="fa-solid fa-user-group"></i>}
                component={<Link to="/dashboard/users" />}
                className={isActive("/dashboard/users") ? activeClass : ""}
              >
                Users
              </MenuItem>

              <MenuItem
                icon={<i className="fa-solid fa-network-wired fa-sm "></i>}
                component={<Link to="/dashboard/projects" />}
                className={isActive("/dashboard/projects") ? activeClass : ""}
              >
                Projects
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-list fa-lg "></i>}
                component={<Link to="/dashboard/tasks" />}
                className={isActive("/dashboard/tasks") ? activeClass : ""}
              >
                Tasks
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-unlock-keyhole"></i>}
                component={<Link to="/change-password" />}
                className={isActive("/change-password") ? activeClass : ""}
              >
                Change Password
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-right-from-bracket"></i>}
                component={<Link to="/dashboard/logOut" />}
                className={isActive("/dashboard/logOut") ? activeClass : ""}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default SideBar;
