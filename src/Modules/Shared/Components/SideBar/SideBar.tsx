import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";

interface SideBarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const SideBar = () => {
  const [isCollapsable, setIsCollapsable] = useState(() => {
    const saved = localStorage.getItem("isCollapsable");
    return saved === "true";
  });

  const toggleCollapse = () => setIsCollapsable(!isCollapsable);
  const location = useLocation();
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext)!;
  console.log(loginData);
  const isActive = (path: string) => location.pathname === path;
  const activeClass = "active-sidebar-item";
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    localStorage.setItem("isCollapsable", isCollapsable.toString());
  }, [isCollapsable]);

  return (
    <div className="position-sticky top-0 vh-100 sidebar-cont text-white ">
      <div className="position-relative">
        <Sidebar collapsed={isCollapsable}>
          <Menu>
            <MenuItem>
              <div className="d-none d-md-block position-absolute top-0 end-0 mt-2 me-n2">
                <button
                  onClick={toggleCollapse}
                  className="arrow-sideBar p-2 rounded-start-4 border-0 bg-main-color text-white"
                >
                  <i className="fa-solid fa-angle-left fs-4"></i>
                </button>
              </div>
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
            {loginData?.userGroup == "Manager" ? (
              <MenuItem
                icon={<i className="fa-solid fa-user-group"></i>}
                component={<Link to="/dashboard/users" />}
                className={isActive("/dashboard/users") ? activeClass : ""}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa-solid fa-network-wired fa-sm"></i>}
              component={<Link to="/dashboard/projects" />}
              className={isActive("/dashboard/projects") ? activeClass : ""}
            >
              Projects
            </MenuItem>
            {loginData?.userGroup == "Manager" ? (
              <MenuItem
                icon={<i className="fa-solid fa-list fa-lg"></i>}
                component={<Link to="/dashboard/tasks" />}
                className={isActive("/dashboard/tasks") ? activeClass : ""}
              >
                Tasks
              </MenuItem>
            ) : (
              <MenuItem
                icon={<i className="fa-solid fa-list fa-lg"></i>}
                component={<Link to="/dashboard/tasksEmployee" />}
                className={
                  isActive("/dashboard/tasksEmployee") ? activeClass : ""
                }
              >
                Tasks
              </MenuItem>
            )}

            <MenuItem
              icon={<i className="fa-solid fa-unlock-keyhole"></i>}
              component={<Link to="/change-password" />}
              className={isActive("/change-password") ? activeClass : ""}
            >
              Change Password
            </MenuItem>

            <MenuItem
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              onClick={logout}
              className={isActive("") ? activeClass : ""}
            >
              Log Out
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
};

export default SideBar;
