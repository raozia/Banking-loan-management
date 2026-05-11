import { useState } from "react";
import Cookies from "js-cookie";
import { IoMdMail } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        userEmail,
        password,
      });
      console.log("tokens are", res.data);
      Cookies.set("accessToken", res.data.data.accessToken);
      Cookies.set("refreshToken", res.data.data.refreshToken);
      console.log("Tokens are there..", Cookies.get());

      navigate("/dashboard/home");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };
  return (
    <>
      <div className="min-h-screen py-15 bg-linear-to-r 115deg from-[#9F7AEA] to-[#FEE2FE]  ">
        <div className="container mx-auto ">
          <div className="flex flex-col w-10/12 lg:flex-row lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full  py-15 px-10">
              <h2 className="text-4xl font-bold font-sans text-center text-purple-600 mb-4">
                Login
              </h2>
              <p className="mb-4 text-gray-400">Login To Your Account.</p>
              <form onSubmit={handleLogin}>
                <div className="mt-5 relative ">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-400 pointer-events-none">
                    <IoMdMail />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id=""
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-400 py-1 px-2  w-full"
                  />
                </div>
                <div className="mt-5 relative">
                  <div className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-400 pointer-events-none">
                    <FaEyeSlash />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id=""
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                </div>

                {/* <div className="mt-5 ">
                  <input type="checkbox" className="border border-gray-400" />
                  <span className="ml-2">
                    I accept the{" "}
                    <Link to="#" className="text-gray-400">
                      terms
                    </Link>{" "}
                    &
                    <Link to={"#"} className="text-gray-400">
                      conditions
                    </Link>{" "}
                  </span>
                </div> */}
                <div className="btn mt-5">
                  <button
                    type="submit"
                    className="bg-purple-600 w-full py-3 text-center text-white hover:bg-blue-400 hover:cursor-pointer hover:text-black"
                  >
                    Login Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
