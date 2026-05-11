import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    navigate("/");
  };
  return (
    <div>
      <nav className="flex justify-between items-center  bg-gray-500 p-2">
        <div>
          <h1 className="text-white text-2xl font-bold">Bank System</h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-400 hover:bg-blue-500 text-white p-1  rounded hover:cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
