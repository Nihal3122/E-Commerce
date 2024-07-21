import React, { useContext, useEffect, useRef, useState } from "react";
import { getCategoryWiseProduct } from "../helpers/getCategoryWiseProducts";
import { displayCurrency } from "../helpers/DisplayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Context from "../context";
import { addToCart } from "../helpers/AddToCart";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const { countCartProduct } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await countCartProduct();
  };

  const loadingList = new Array(13).fill(null);

  const getData = async () => {
    try {
      setLoading(true);
      const categoryProduct = await getCategoryWiseProduct(category);
      setData(categoryProduct.data.categoryWiseProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const truncateText = (text, wordLimit) => {
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

  useEffect(() => {
    getData();
  }, [category]);

  const scrollRight = () => {
    ref.current.scrollBy({ left: 800, behavior: "smooth" });
  };

  const scrollLeft = () => {
    ref.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto pl-8 px-4 my-6 relative">
      <h2 className="text-3xl text-gray-800 font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-9 overflow-x-auto scrollbar-none transition-all scrollbart-none"
        ref={ref}
      >
        <button
          className="bg-white text-gray-700 hover:text-gray-500 rounded-full p-2 transition duration-200 absolute shadow-lg left-3 text-lg z-10 hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white text-gray-700 hover:text-gray-500 rounded-full p-2 transition duration-200 absolute shadow-lg right-8 text-lg z-10 hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => (
              <div
                key={index}
                className="cursor-pointer mt-5 w-full min-w-[280px] md:min-w-[370px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-sm shadow flex animate-pulse"
              >
                <div className="bg-slate-200 h-full p-3 min-w-[110px] md:min-w-[145px]"></div>
                <div className="p-3">
                  <h2 className="font-medium md:text-lg bg-slate-200 p-2 rounded-full px-24 text-base ml-2 mr-3 mt-1"></h2>
                  <p className="capitalize ml-2 mt-5 bg-slate-200 p-1.5 w-20 rounded-full "></p>
                  <div className="flex gap-2 ml-2 mt-6 ">
                    <p className="text-red-500 font-medium bg-slate-200 p-1.5 w-20 rounded-full "></p>
                    <p className="text-slate-500 line-through bg-slate-200 p-1.5 w-20 rounded-full "></p>
                  </div>
                  <button className="text-white py-3 ml-7 rounded-full transition-colors mt-6 bg-slate-200 w-36"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => {
              const { discountAmount, discountPercentage } = calculateDiscount(
                product.price,
                product.sellingPrice
              );

              return (
                <Link
                  to={`/product/${product?._id}`}
                  key={index}
                  className="cursor-pointer mt-5 w-full min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-3 min-w-[110px] md:min-w-[110px]">
                    <img
                      src={product.ProductImage[0]}
                      className="object-fill h-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="px-3 p-1">
                    <h2 className="font-medium md:text-lg text-base ml-2 mr-3 mt-1">
                      {truncateText(product?.productName, 2)}
                    </h2>
                    <p className="capitalize ml-2 mt-0.5 text-slate-600">
                      {product?.category}
                    </p>
                    <div className="flex gap-1 ml-2 mt-1">
                      <p className=" font-semibold  text-base">
                        {displayCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayCurrency(product?.price)}
                      </p>
                      <p className="text-green-600 font-semibold">
                        {discountPercentage}% off
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className="bg-blue-600 text-white px-10 py-2 ml-7 rounded-full hover:bg-blue-700 transition-colors mt-4"
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
