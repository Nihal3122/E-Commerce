import React from "react";
import cancelImg from "../assets/cancel.gif";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Cancel = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full mx-auto text-center">
          <img
            src={cancelImg}
            alt="SuccessImg"
            className="mx-auto mb-4"
            style={{ width: 150 }}
          />
          <p className="text-red-500 font-bold text-2xl mb-4">
            Payment Cancelled
          </p>
          <p className="text-gray-700 mb-8">Your payment has been cancelled.</p>
          <Link to="/cart">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-800">
              Go To Cart
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cancel;
