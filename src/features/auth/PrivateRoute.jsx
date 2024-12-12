import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function PrivateRoute(prop) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? prop.children : <Navigate to="/Login" />;
}
export default PrivateRoute;