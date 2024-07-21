import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../context";
import { displayCurrency } from "../helpers/DisplayCurrency";
import Header from "./Header";
import { toast } from "react-toastify";
import EmptyCart from "../assets/EmptyCart.png";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cartProductCount, countCartProduct } = useContext(Context);

  const loadingList = new Array(cartProductCount).fill(null);

  const getCartData = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/api/v1/cart/getCartData",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartData(response?.data?.cartData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/cart/update-cart-product",
        {
          _id: id,
          quantity: qty + 1,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        getCartData();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/cart/update-cart-product",
          {
            _id: id,
            quantity: qty - 1,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          getCartData();
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeProductFromCart = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/cart/delete-cart-product",
        { id },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        getCartData();
        countCartProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalQty = cartData.reduce(
    (prevValue, currValue) => prevValue + currValue.quantity,
    0
  );

  const totalPrice = cartData.reduce(
    (prevValue, currValue) =>
      prevValue + currValue.quantity * currValue.productId.sellingPrice,
    0
  );

  const totalOriginalPrice = cartData.reduce(
    (prevValue, currValue) =>
      prevValue + currValue.quantity * currValue.productId.price,
    0
  );

  const totalDiscount = totalOriginalPrice - totalPrice;
  const totalDiscountPercentage = (
    (totalDiscount / totalOriginalPrice) *
    100
  ).toFixed(2);

  const handleCheckout = async () => {
    try {
      setLoadingSpinner(true);
      const stripePromise = await loadStripe(
        "pk_test_51PbxUSEqva2U2rnaXFodkfbawd2TNrHx7njE0qMKU2HNnDU81w2ETRoqxkmeemNk0QYWf3zFwSAfyh9NhH3hgUmO00Y0povkOz"
      );
      const response = await axios.post(
        "http://localhost:8080/api/v1/order/checkout",
        {
          cartItems: cartData,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.data?.id) {
        await stripePromise.redirectToCheckout({
          sessionId: response?.data?.id,
        });
        setLoadingSpinner(false);
      }
      countCartProduct();
    } catch (error) {
      console.log(error);
      setLoadingSpinner(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto  h-auto ">
        <div className="text-center text-lg py-20">
          {cartData.length === 0 && !loading && (
            <div className="">
              <div className="flex flex-col h-[450px] items-center justify-center mt-8 bg-white ml-36 mr-36 border shadow-md">
                <img
                  src={EmptyCart}
                  className="w-64 mb-4"
                  alt="Empty Cart Image"
                />
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Your cart is empty!
                </p>
                <p className="text-gray-600 mb-4">Add items to it now.</p>
                <Link
                  to={"/"}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
                >
                  Shop now
                </Link>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* View Product */}
            <div className="w-full max-w-3xl ml-10 b">
              {loading ? (
                loadingList.map((el, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 w-full h-36 flex items-center justify-center my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                ))
              ) : (
                <div>
                  {cartData.map((product, index) => {
                    const discountAmount =
                      product?.productId?.price -
                      product?.productId?.sellingPrice;
                    const discountPercentage = (
                      (discountAmount / product?.productId?.price) *
                      100
                    ).toFixed(2);

                    return (
                      <div
                        key={index}
                        className="w-[900px] bg-white h-auto my-7 border border-slate-300 rounded-lg shadow-md grid grid-cols-[128px,1fr] gap-16 "
                      >
                        <div className="w-48 h-48 p-3 bg-gray-100 flex items-center justify-center">
                          <img
                            src={product?.productId?.ProductImage[0]}
                            alt={product?.productId?.productName}
                            className="w-full h-full p-3 object-scale-down mix-blend-multiply"
                          />
                        </div>
                        <div className="p-4 flex flex-col">
                          {/* Delete icon */}
                          <div
                            onClick={() => removeProductFromCart(product._id)}
                            className="uppercase cursor-pointer absolute hover:text-blue-600 ml-[595px] mt-[135px] hover:underline"
                          >
                            Remove
                          </div>
                          <div>
                            <h2 className="font-semibold text-start text-ellipsis line-clamp-1">
                              {product?.productId?.productName}
                            </h2>
                            <p className="text-start capitalize text-slate-500">
                              {product?.productId?.category}
                            </p>
                            <div className="">
                              <p className="text-lg text-start text-green-600 font-semibold">
                                Extra ₹{discountAmount} off
                              </p>
                              <div className="flex items-center gap-1 my-1">
                                <p className="text-xl font-semibold">
                                  {displayCurrency(
                                    product?.productId?.sellingPrice
                                  )}
                                </p>
                                <p className="text-base font-normal text-gray-500 line-through">
                                  {displayCurrency(product?.productId?.price)}
                                </p>
                                <p className="text-sm text-green-600 font-semibold">
                                  {discountPercentage}% off
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-start">
                            <button
                              onClick={() =>
                                increaseQty(product?._id, product?.quantity)
                              }
                              className="pb-1 w-8 h-8 border border-gray-300 rounded-full text-xl font-semibold flex items-center justify-center hover:bg-gray-100 active:bg-gray-200"
                            >
                              +
                            </button>
                            <span className="text-lg font-medium">
                              {product?.quantity}
                            </span>
                            <button
                              onClick={() =>
                                decreaseQty(product?._id, product?.quantity)
                              }
                              className="pb-1 w-8 h-8 border border-gray-300 rounded-full text-xl font-semibold flex items-center justify-center hover:bg-gray-100 active:bg-gray-200"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Total Summary */}
            <div className="lg:mt-4 w-[600px] max-w-sm ml-16 lg:ml-52">
              {loading ? (
                <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
              ) : (
                cartData.length >= 1 && (
                  <div className="mt-3 h-[390px] bg-white border border-gray-300 rounded-lg shadow-lg sticky top-[108px]">
                    {/* Ensure 'sticky' positions the element */}
                    <h2 className="border border-b-gray-200 text-gray-600 text-xl py-2 px-4 rounded-t-lg text-center">
                      PRICE DETAILS
                    </h2>
                    <div className="py-3 flex flex-col gap-3">
                      <div className="flex items-center justify-between px-4 gap-2 text-gray-900 text-lg">
                        <p>Original Price :</p>
                        <p>{displayCurrency(totalOriginalPrice)}</p>
                      </div>
                      <div className="flex items-center justify-between px-4 gap-2 text-gray-900 text-lg">
                        <p>Discount :</p>
                        <p className="text-green-600">
                          {displayCurrency(totalDiscount)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between px-4 gap-2 text-gray-900 text-lg">
                        <p>Quantity :</p>
                        <p className="text-green-600">{totalQty}</p>
                      </div>
                      <p className="border border-b-gray-100"></p>
                      <div className="flex items-center justify-between px-6 gap-2 text-gray-900 text-xl font-semibold py-3">
                        <p>Total :</p>
                        <p>{displayCurrency(totalPrice)}</p>
                      </div>
                      <p className="border border-b-gray-100"></p>

                      <p className="text-green-600">
                        You will save {displayCurrency(totalDiscount)} on this
                        order
                      </p>
                      {loadingSpinner ? (
                        <div className="mt-8 flex justify-center font-normal text-xl bg-orange-600 w-full text-white py-[10px] rounded-b-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition duration-200">
                          <div className="animate-spin rounded-full h-8 w-8  border-b-2  border-white border-opacity-100"></div>
                        </div>
                      ) : (
                        <button
                          onClick={handleCheckout}
                          className="mt-8 font-normal text-xl bg-orange-600 w-full text-white py-[10px] rounded-b-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition duration-200"
                        >
                          PLACE ORDER
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
