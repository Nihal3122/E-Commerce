import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SuccessImg from "../assets/success.gif";
import Header from "../components/Header";
import Context from "../context";

const Success = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full mx-auto text-center">
          <img
            src={SuccessImg}
            alt="SuccessImg"
            className="mx-auto mb-4"
            style={{ width: 150 }}
          />
          <p className="text-green-500 font-bold text-2xl mb-4">
            Payment Successful
          </p>
          <p className="text-gray-700 mb-8">
            Thank you for your purchase. Your order has been successfully
            processed.
          </p>
          <Link to="/order">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
