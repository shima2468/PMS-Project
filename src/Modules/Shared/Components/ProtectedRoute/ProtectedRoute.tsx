import { useContext, type PropsWithChildren } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const auth = useContext(AuthContext);
  if (auth?.loginData || localStorage.getItem("token")) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;
