import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationLayout from "./Modules/Shared/Components/AuthenticationLayout/AuthenticationLayout";
import LogIn from "./Modules/Authentication/Components/LogIn/LogIn";
import ForgetPassword from "./Modules/Authentication/Components/Forget-Password/Forget-Password";
import Register from "./Modules/Authentication/Components/Register/Register";
import ResetPassword from "./Modules/Authentication/Components/Reset-Password/Reset-Password";
import ChangePassword from "./Modules/Authentication/Components/Change-Password/Change-Password";
import VerifyAccount from "./Modules/Authentication/Components/Verify-Account/Verify-Account";
import NotFound from "./Modules/Shared/Components/NotFound/NotFound";
import MasterLayout from "./Modules/Shared/Components/MasterLayout/MasterLayout";
import Dashboard from "./Modules/Dashboard/Components/Dashboard/Dashboard";
import ProjectsList from "./Modules/Projects/Components/ProjectsList/ProjectsList";
import ProjectsData from "./Modules/Projects/Components/ProjectsData/ProjectsData";
import TasksList from "./Modules/Tasks/Components/TasksList/TasksList";
import TasksData from "./Modules/Tasks/Components/TasksData/TasksData";
import UsersList from "./Modules/Users/Components/UsersList/UsersList";
import LogOut from "./Modules/Authentication/Components/LogOut/LogOut";
import AuthContextProvider from "./Context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import DeletConiformation from "./Modules/Shared/Components/DeletConiformation/DeletConiformation";
import ProtectedRoute from "./Modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import Profile from "./Modules/Profile/components/Profile";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthenticationLayout />,
      children: [
        { index: true, element: <LogIn /> },
        { path: "login", element: <LogIn /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
      errorElement: <NotFound />,
    },
    {
      path: "/dashboard",

      element: (
        <ProtectedRoute>
          {" "}
          <MasterLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "projects/", element: <ProjectsList /> },
        { path: "projects", element: <ProjectsList /> },
        {path:"profile" , element:<Profile/>},
        { path: "projects/new-project", element: <ProjectsData /> },
        { path: "projects/:projectId", element: <ProjectsData /> },
        { path: "tasks", element: <TasksList /> },
        { path: "tasksData", element: <TasksData /> },
        { path: "users", element: <UsersList /> },
        { path: "logOut", element: <LogOut /> },
        {
          path: "Delete",
          element: (
            <DeletConiformation
              show={true}
              onHide={() => {}}
              onConfirm={() => {}}
              itemName=""
            />
          ),
        },
      ],
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </>
  );
}

export default App;
