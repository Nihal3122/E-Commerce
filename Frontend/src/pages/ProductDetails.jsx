import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { FaStar, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { displayCurrency } from "../helpers/DisplayCurrency";
import CategoryWiseProduct from "../components/CategoryWiseProduct";
import Context from "../context";
import { addToCart } from "../helpers/AddToCart";

const ProductDetails = () => {
  const [data, setData] = useState(null); // Use null to indicate initial loading state
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCordinate, setZoomImageCordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);
  const { countCartProduct } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await countCartProduct();
  };
  const { id } = useParams();
  const productImageListLoading = new Array(4).fill(null);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/product-details/${id}`,
        { withCredentials: true }
      );
      setData(response.data);
      setLoading(false);
      setActiveImage(response.data?.product?.ProductImage[0]);
    } catch (error) {
      console.log(error);
      setLoading(false); // Ensure loading state is reset on error
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]); // Fetch data whenever id changes

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const truncateText = (text = "", wordLimit) => {
    if (typeof text !== "string") {
      return text;
    }

    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const calculateDiscount = (originalPrice, sellingPrice) => {
    const discountAmount = originalPrice - sellingPrice;
    const discountPercentage = ((discountAmount / originalPrice) * 100).toFixed(
      0
    );
    return { discountAmount, discountPercentage };
  };

  const { discountAmount, discountPercentage } = data?.product
    ? calculateDiscount(data.product.price, data.product.sellingPrice)
    : { discountAmount: 0, discountPercentage: 0 };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCordinate({ x, y });
    },
    [zoomImageCordinate]
  );

  const handleZoomOutImage = () => {
    setZoomImage(false);
  };

  // Check if data or data.product is not available yet
  if (!data || !data.product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container p-10 pt-32">
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="h-[580px] flex flex-col lg:flex-row-reverse gap-12">
            <div className="h-[400px] w-[400px] lg:h-[450px] lg:w-[450px] bg-slate-200 flex justify-center items-center">
              {loading ? (
                <div className="flex justify-center items-center h-full"></div>
              ) : (
                <div className="h-full w-full  relative">
                  <img
                    className="h-full w-full p-6 object-scale-down mix-blend-darken cursor-zoom-in"
                    src={activeImage}
                    alt="Image"
                    onMouseMove={handleZoomImage}
                    onMouseLeave={handleZoomOutImage}
                  />
                  {/* Product Image Zoom */}
                  {zoomImage && (
                    <div className="hidden lg:block absolute min-w-[550px] bg-slate-200 min-h-[550px] p-1 -right-[864px] top-0 transi">
                      <img
                        className="w-full h-full min-h-[600px] min-w-[850px] mix-blend-darken  border-none "
                        style={{
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${zoomImageCordinate.x * 100}% ${
                            zoomImageCordinate.y * 100
                          }%`,
                        }}
                      />
                    </div>
                  )}
                  <div className="flex gap-4 mt-10">
                    <Link
                      className="flex items-center bg-orange-500 text-white px-[54px] py-2 text-lg rounded shadow hover:bg-orange-700 focus:outline-none"
                    >
                      <FaCreditCard className="mr-2" /> Buy Now
                    </Link>
                    <button
                      className="flex items-center bg-blue-500 text-white px-[54px] py-3 rounded text-lg shadow hover:bg-blue-700 focus:outline-none"
                      onClick={(e) => handleAddToCart(e, id)}
                    >
                      <FaShoppingCart className="mr-2" /> Add To Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-full">
              {loading ? (
                <div className="flex gap-8 lg:flex-col overflow-scroll scrollbart-none h-full animate-pulse">
                  {productImageListLoading.map((el, index) => (
                    <div
                      key={index}
                      className="h-[89px] w-[89px] bg-slate-200 rounded object-scale-down mix-blend-multiply"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-8 lg:flex-col overflow-scroll scrollbart-none h-full">
                  {data.product.ProductImage.map((imageURL, index) => (
                    <div
                      key={index}
                      className="h-[89px] w-[89px] rounded p-2 bg-slate-200"
                    >
                      <img
                        src={imageURL}
                        alt={`productImage-${index}`}
                        className="w-full h-full cursor-pointer mix-blend-darken object-scale-down "
                        onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                        onClick={() => handleMouseEnterProduct(imageURL)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Product details */}
          <div className="flex flex-col gap-3">
            <p className="bg-green-600 text-white font-semibold px-4 py-1 w-28 text-center rounded-full overflow-hidden whitespace-nowrap">
              {data.product.brandName}
            </p>
            <h2 className="text-2xl font-medium lg:text-4xl">
              {truncateText(data.product.productName, 14)}
            </h2>
            <p className="capitalize text-slate-700 text-xl">
              {data.product.category}
            </p>
            <div className="bg-green-600 text-gray-800 w-16 p-1 rounded flex items-center justify-center shadow-md">
              <p className="text-sm font-semibold text-white">4.5</p>
              <FaStar className="ml-1 text-white text-xs" />
            </div>
            <div className="my-2">
              <p className="text-lg text-green-600 font-semibold">
                Extra ₹{discountAmount} off
              </p>
              <div className="flex items-center gap-2">
                <p className="text-3xl  font-semibold">
                  {displayCurrency(data.product.sellingPrice)}
                </p>
                <p className="text-xl font-medium text-gray-500 line-through">
                  {displayCurrency(data.product.price)}
                </p>
                <p className="text-lg text-green-600 font-semibold">
                  {discountPercentage}% off
                </p>
              </div>
            </div>
            <div>
              <p className=" font-semibold text-2xl mb-2">Description:</p>
              <p className="text-slate-600 text-lg leading-relaxed line-clamp-5">
                {data.product.description}
              </p>
            </div>
          </div>
        </div>
        {/* Render VerticalCardProduct when data is available */}

        {/* Render VerticalCardProduct when data is available */}
        {data.product.category && (
          <CategoryWiseProduct
            category={data?.product?.category}
            heading={"Recommended Product"}
          />
        )}
      </div>
    </>
  );
};

export default ProductDetails;
