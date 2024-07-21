import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/Category";
import { IoCloudUpload } from "react-icons/io5";
import { UploadImage } from "../helpers/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const UploadProduct = ({ setShowUploadProduct, getAllProduct }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    ProductImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await UploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        ProductImage: [...prev.ProductImage, uploadImageCloudinary?.data?.url],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/products/upload-product",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setShowUploadProduct(false);
        getAllProduct();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setShowUploadProduct(false);
    }
  };

  const handleDeleteImage = async (index) => {
    const newProductImage = [...data.ProductImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        ProductImage: [...newProductImage],
      };
    });
  };

  return (
    <div className="fixed bg-slate-200 bg-opacity-55 w-full h-full bottom-0 top-0 left-0 right-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-gray-800">Upload Product</h2>
          <div
            className="w-fit text-2xl cursor-pointer duration-300 transform hover:text-blue-600 hover:scale-110 transition-all"
            onClick={() => setShowUploadProduct(false)}
          >
            <IoMdClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition duration-200"
          />
          <label htmlFor="brandName" className="mt-2">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition duration-200"
          />
          <label htmlFor="category" className="mt-2">
            Category :
          </label>
          <select
            value={data.category}
            onChange={handleOnChange}
            name="category"
            className="p-3 bg-slate-100 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition duration-200"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((product, index) => {
              return (
                <option value={product?.value} key={product.id}>
                  {product?.value}
                </option>
              );
            })}
          </select>
          <label htmlFor="ProductImage" className="mt-2">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 borded rounded w-full h-40 flex justify-center items-center cursor-pointer">
              <div className="text-slate-500  flex justify-center items-center flex-col gap-2">
                <span>
                  <IoCloudUpload className="text-5xl" />
                </span>
                <p className="text-sm">Upload product image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.ProductImage[0] ? (
              <div className="flex gap-4 items-center">
                {data.ProductImage.map((el, index) => (
                  <div
                    className=" relative group"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(el);
                    }}
                  >
                    <img
                      key={index}
                      src={el}
                      width={100}
                      className="bg-slate-100 border border-gray-300 h-[80px] object-contain rounded shadow-md mt-2 cursor-pointer"
                    />
                    <MdDelete
                      className="text-2xl absolute right-0 bottom-0 text-white bg-red-500  p-1 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500 text-xs mt-2">
                Please Upload Product Images
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-2">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition duration-200"
          />
          <label htmlFor="sellingPrice" className="mt-2">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition duration-200"
          />
          <label htmlFor="description" className="mt-2">
            Description :
          </label>
          <textarea
            name="description"
            id="description"
            value={data.description}
            rows={3}
            onChange={handleOnChange}
            className="h-28 bg-slate-100 resize-none p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition duration-200 outline-none"
            placeholder="Enter product description"
          />
          <button class="bg-blue-800 text-white font-semibold py-3 px-4 rounded hover:bg-blue-700 mb-10 mt-7">
            Upload Product
          </button>
        </form>
      </div>
      {/* Display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imageURL={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
