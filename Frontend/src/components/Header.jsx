import React, { useState, useEffect, useContext } from "react";
import Logo from "./Logo";
import { IoSearchSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";

const Header = () => {
  const { user } = useSelector((state) => state?.user);
  const { cartProductCount } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = async () => {
    try {
      const response = await axios(
        "http://localhost:8080/api/v1/users/logout",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUserDetails(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/products/getall-product",
        { withCredentials: true }
      );
      setAllProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredProducts = allProducts.filter((product) => {
      const productNameMatches = product.productName
        .toLowerCase()
        .includes(searchTerm);
      const categoryMatches = product.category
        .toLowerCase()
        .includes(searchTerm);

      return productNameMatches || categoryMatches;
    });

    setSearchResults(filteredProducts.slice(0, 6)); // Limit results to 6 items
  };

  return (
    <>
      <header className="h-20 shadow-md bg-white fixed top-0 w-full z-10">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="w-16 mt-2 ml-28 cursor-pointer">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="hidden lg:flex items-center w-full mt-3 justify-between max-w-[500px]">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search product here..."
                className="flex-grow outline-none rounded-l-full w-[450px] p-3 mr-4 focus:shadow-md transition duration-200 ease-in-out pl-6 border border-gray-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="button"
                  className="text-lg flex items-center justify-center bg-[#0000FF] h-[50px] w-16 rounded-r-full text-white cursor-pointer hover:bg-[#3636e8] transition duration-200 ease-in-out focus:outline-none"
                >
                  <IoSearchSharp />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 mt-3">
            <div
              className="cursor-pointer relative group flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?._id ? (
                <div>
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="rounded-full h-12 w-12 object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="text-3xl cursor-pointer text-gray-700 hover:text-blue-600">
                      <FaUserAlt />
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              {menuDisplay && (
                <div className="absolute top-[52px]  w-40 h-auto p-2 shadow-lg rounded-lg bg-white border border-gray-200 z-50">
                  {user?.role === "ADMIN" && (
                    <>
                      <nav className="mb-0">
                        <Link
                          to="/admin-panel/products"
                          className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                        >
                          Admin Panel
                        </Link>
                      </nav>
                    </>
                  )}
                  <nav className="mt-0">
                    <Link
                      to="/order"
                      className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      Orders
                    </Link>
                  </nav>
                </div>
              )}
            </div>
            {user?._id ? (
              <Link to={"/cart"} className="relative text-3xl cursor-pointer">
                <span className="relative">
                  <FaShoppingCart />
                  <div className="bg-[#0000FF] w-6 h-6 text-white flex items-center justify-center rounded-full absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <p className="text-sm mb-0">{cartProductCount}</p>
                  </div>
                </span>
              </Link>
            ) : (
              ""
            )}
            <div className="mr-10">
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className="px-7 py-2.5 rounded-full bg-[#0000FF] text-white text-lg hover:bg-blue-700 transition duration-200 ease-in-out"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-7 py-2.5 rounded-full bg-[#0000FF] text-white text-lg hover:bg-blue-700 transition duration-200 ease-in-out"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Render Search Results */}
      {searchTerm && (
        <div className="absolute top-[50px] right-[179px] left-0 z-20  px-4 py-2 mt-2 mx-auto max-w-md rounded cursor-pointer">
          <div className="bg-white shadow-md border border-gray-300 rounded">
            {searchResults.length === 0 ? (
              <p className="text-gray-600 p-4">No products found.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    className="flex items-center p-2 hover:bg-gray-100 transition duration-200 ease-in-out"
                    to={`/product/${product._id}`}
                  >
                    <img
                      src={product?.ProductImage[0]}
                      alt={product.productName}
                      className="w-8 h-8 object-contain mr-4 rounded-lg"
                    />
                    <div className="text-ellipsis line-clamp-1 flex flex-col">
                      <p className="text-sm font-medium text-ellipsis line-clamp-1">
                        {product.productName}
                      </p>
                      <p className="text-sm font-medium text-gray-500 hover:underline">
                        {product.category}
                      </p>
                      {/* Add more product details here */}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
