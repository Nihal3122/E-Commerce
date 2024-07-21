import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const getCategoryProduct = async () => {
    try {
      setLoading(true);
      const response = await axios(
        "http://localhost:8080/api/v1/products/get-categoryProduct",
        { withCredentials: true }
      );
      setLoading(false);
      setCategoryProduct(response?.data?.singleProductByCategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4 pt-24 ">
      <div className="flex items-center  justify-between space-y-2 overflow-scroll scrollbart-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  key={index}
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={`/product-category`}
                  key={product?._id}
                  className=" "
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 p-4 bg-white flex items-center justify-center rounded-full overflow-hidden shadow-md  cursor-pointer">
                    <img
                      src={product?.ProductImage[0]}
                      alt="categoryImages"
                      className="h-[75px] object-scale-down hover:scale-110 transform transition duration-300 "
                    />
                  </div>
                  <p className=" text-sm md:text-sm  text-center font-medium text-gray-500  rounded-full px-3 py-1 capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
