import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const GuestRoute = ({ children }) => {
  const token = Cookies.get("accessToken");

  if (token) {
    return <Navigate to="/dashboard/home" />;
  }

  return children;
};

export default GuestRoute;
