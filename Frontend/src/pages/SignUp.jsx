import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import login_icon from "../assets/Login_icon.png";
import { ImageToBase64 } from "../helpers/ImageToBase64";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("name", data.name);
    formData.append("profilePic", file); // Append the file to formData

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section id="login" className="mt-14 ">
        <div className="max-auto container p-4 ">
          <div className="bg-white p-2 py-5 w-full max-w-[450px] mx-auto rounded shadow-xl">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full ">
              <div>
                <img
                  src={file ? URL.createObjectURL(file) : login_icon}
                  alt="loginIcon"
                  name="profilePic"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <form>
                <label>
                  <div className="text-sm bg-slate-200 bg-opacity-80 cursor-pointer text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="profilePic"
                    className="hidden"
                  />
                </label>
              </form>
            </div>
            <form
              className="max-w-md mx-auto p-6  rounded-lg "
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <div className="bg-slate-100 p-2 rounded-md">
                    <input
                      type="text"
                      onChange={handleOnChange}
                      name="name"
                      value={data.name}
                      className="w-full h-full outline-none bg-transparent text-gray-700"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
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
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password:
                  </label>
                  <div className="bg-slate-100 p-2 rounded-md flex items-center">
                    <input
                      type={showConfirmPassword ? "password" : "text"}
                      onChange={handleOnChange}
                      value={data.confirmPassword}
                      name="confirmPassword"
                      className="w-full h-full outline-none bg-transparent text-gray-700"
                      placeholder="Enter confirm password"
                    />
                    <div
                      className="cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center w-full mt-7 bg-[#0000FF] text-white rounded-full p-2 hover:bg-blue-700 transition duration-200 ease-in-out">
                  <div className="animate-spin rounded-full h-8 w-8  border-b-2  border-white border-opacity-100"></div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full mt-7 bg-[#0000FF] text-white p-3 rounded-full hover:bg-blue-700 transition duration-200 ease-in-out"
                >
                  Sign up
                </button>
              )}
            </form>
            <p className="text-center mr-3 mt-3 text-gray-600">
              Already have an account?{" "}
              <Link
                className="text-blue-700 hover:text-blue-900 hover:underline transition duration-200 ease-in-out"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
