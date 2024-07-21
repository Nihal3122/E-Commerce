import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import login_icon from "../assets/Login_icon.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, countCartProduct } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUserDetails();
        navigate("/");
        countCartProduct();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section id="login" className="mt-32 ">
        <div className="max-auto container p-4 ">
          <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto rounded shadow-xl">
            <div className="w-20 h-20 mx-auto">
              <img src={login_icon} alt="loginIcon" />
            </div>
            <form
              className="max-w-md mx-auto p-6  rounded-lg "
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <div className="bg-slate-100 p-2 rounded-md">
                    <input
                      type="email"
                      onChange={handleOnChange}
                      name="email"
                      value={data.email}
                      className="w-full h-full outline-none bg-transparent text-gray-700"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                  </label>
                  <div className="bg-slate-100 p-2 rounded-md flex items-center">
                    <input
                      type={showPassword ? "password" : "text"}
                      onChange={handleOnChange}
                      name="password"
                      value={data.password}
                      className="w-full h-full outline-none bg-transparent text-gray-700"
                      placeholder="Enter password"
                    />
                    <div
                      className="cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <Link
                    to={"/forgot-password"}
                    className="mt-2 block w-fit ml-auto text-blue-600 hover:text-blue-800 hover:underline  transition duration-200 ease-in-out"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-5 bg-[#0000FF] text-white p-3 rounded-full  hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Login
              </button>
            </form>
            <p className="text-center mr-3 mt-3 text-gray-600">
              Don't have an account?{" "}
              <Link
                className="text-blue-700 hover:text-blue-900 hover:underline transition duration-200 ease-in-out"
                to={"/sign-up"}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
