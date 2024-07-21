import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="min-h-[calc(105vh-120px)] md:flex hidden mt-[63px] ">
        <aside className="bg-white min-h-full w-full max-w-72 shadow-md">
          <div className="h-44 flex justify-center items-center flex-col">
            <div className="flex justify-center mt-10">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user.name}
                  className="rounded-full h-20 w-20 object-contain"
                />
              ) : (
                <div className="text-3xl cursor-pointer">
                  <FaUserAlt size={38} />
                </div>
              )}
            </div>
            <p className="capitalize text-lg font-medium mt-3">
              UserName : {user?.name}
            </p>
            <p className="capitalize text-lg font-medium">
              Role : {user?.role}
            </p>
          </div>
          <div className="mt-10">
            <nav>
              <Link
                to="/admin-panel/all-users"
                className="text-center block py-2 px-4 font-medium hover:bg-gray-200 hover:text-gray-900 transition duration-300 transform hover:scale-105"
              >
                All Users
              </Link>
              <Link
                to="/admin-panel/products"
                className="text-center block py-2 px-4 font-medium hover:bg-gray-200 hover:text-gray-900 transition duration-300 transform hover:scale-105"
              >
                Products
              </Link>
            </nav>
          </div>
        </aside>
        <main className="w-full h-full p-4 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
