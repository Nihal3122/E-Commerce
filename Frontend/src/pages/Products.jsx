import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import axios from "axios";
import AdminProductCard from "../components/AdminProductCard";

const Products = () => {
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const [allProducts, setAllproducts] = useState([]);

  const getAllProduct = async () => {
    const response = await axios(
      "http://localhost:8080/api/v1/products/getall-product",
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    setAllproducts(response?.data?.products || "");
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 py-5 px-8 flex justify-between items-center shadow-lg rounded-lg border border-gray-200">
        <h2 className="font-extrabold text-blue-700 text-2xl">Products</h2>
        <button
          onClick={() => setShowUploadProduct((prev) => !prev)}
          className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Upload Products
        </button>
      </div>

      {/* All products */}
      <div className="flex items-center flex-wrap gap-16 pl-12 mt-8  h-[calc(100vh-210px)] overflow-y-auto">
        {allProducts.map((product, index) => {
          return (
            <AdminProductCard
              product={product}
              key={index}
              getAllProduct={getAllProduct}
            />
          );
        })}
      </div>
      {/* Upload Product Conponent */}
      {showUploadProduct && (
        <UploadProduct
          setShowUploadProduct={setShowUploadProduct}
          getAllProduct={getAllProduct}
        />
      )}
    </div>
  );
};

export default Products;
