import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import AdminEditProduct from "./AdminEditProduct";
import { displayCurrency } from "../helpers/DisplayCurrency";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const AdminProductCard = ({ product, getAllProduct }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/products/delete-product/${id}`,
        { withCredentials: true }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        getAllProduct();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="bg-white p-3  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="w-48 h-61 pt-2 ">
        <div className="flex justify-center items-center">
        <img
          src={product.ProductImage[0]}
          alt={product.productName}
          className="w-32 h-32 object-contain rounded-md mx-auto "
        />
        </div>
        <h1 className="mt-1 text-lg font-semibold text-gray-800 text-center overflow-hidden overflow-ellipsis line-clamp-2">
           {product.productName}
        </h1>

        <p className=" mt-1  text-gray-600 text-center">
          <span className="font-semibold ">
            Price : {displayCurrency(product?.sellingPrice)}
          </span>
        </p>
        <div className="flex justify-between mt-4 space-x-4">
          <div
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <div className="flex items-center gap-2 border px-3 py-1 rounded-xl hover:bg-blue-50">
              <CiEdit className="w-6 h-6" />
              <button className="text-sm">Edit</button>
            </div>
          </div>
          <div
            className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
            onClick={() => handleDelete(product._id)}
          >
            <div className="flex items-center gap-2 border px-3 py-1 rounded-xl hover:bg-red-50">
              <MdDeleteOutline className="w-6 h-6" />
              <button className="text-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          product={product}
          onClose={() => setEditProduct(false)}
          getAllProduct={getAllProduct}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
