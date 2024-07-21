import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import "./App.css";
import AdminPanal from "./pages/AdminPanal";
import AllUsers from "./pages/AllUsers";
import Products from "./pages/Products";
import AdminPanel from "./pages/AdminPanal";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";
import SearchProduct from "./pages/SearchProduct";
import CategoryList from "./components/CategoryList";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Orders from "./pages/Orders";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserDetails = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/api/v1/users/userdetails",
        { withCredentials: true }
      );
      dispatch(setUserDetails(response?.data?.user));
    } catch (error) {
      console.log(error);
    }
  };
  const countCartProduct = async () => {
    const response = await axios(
      "http://localhost:8080/api/v1/cart/countCartProduct",
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    setCartProductCount(response?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    countCartProduct();
  }, []);

  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProductCount, countCartProduct }}
      >
        <Router>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="/success" element={<Success />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product-category" element={<CategoryProduct />} />
            <Route path="/admin-panel" element={<AdminPanel />}>
              <Route path="all-users" element={<AllUsers />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Routes>
        </Router>
      </Context.Provider>
    </>
  );
};

export default App;
