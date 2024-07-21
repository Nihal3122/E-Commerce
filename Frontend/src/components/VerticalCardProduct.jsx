import React, { useContext, useEffect, useRef, useState } from "react";
import { getCategoryWiseProduct } from "../helpers/getCategoryWiseProducts";
import { displayCurrency } from "../helpers/DisplayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { addToCart } from "../helpers/AddToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
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

  useEffect(() => {
    getData();
  }, [category]);

  const scrollRight = () => {
    ref.current.scrollBy({ left: 800, behavior: "smooth" });
  };

  const scrollLeft = () => {
    ref.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  const calculateDiscount = (originalPrice, sellingPrice) => {
    const discountAmount = originalPrice - sellingPrice;
    const discountPercentage = ((discountAmount / originalPrice) * 100).toFixed(
      0
    );
    return { discountAmount, discountPercentage };
  };

  return (
    <div className="container mx-auto pl-8 px-4 my-6 relative">
      <h2 className="text-3xl text-gray-800 font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-9 overflow-x-scroll scrollbart-none transition-all"
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
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="cursor-pointer mt-5 w-full min-w-[280px] md:min-w-[290px] max-w-[280px] md:max-w-[320px] bg-white rounded-2xl shadow scrollbart-none animate-pulse"
              >
                <div className="bg-slate-200 h-48 flex items-center justify-center p-3 min-w-[280px] md:min-w-[145px]"></div>
                <div className="p-3 grid gap-2">
                  <h2 className="font-medium md:text-lg text-base ml-2 mr-3 mt-1 line-clamp-1 p-1 bg-slate-200 rounded-full"></h2>
                  <p className="capitalize ml-2 bg-slate-200 mt-0.5 text-slate-600 p-1 rounded-full"></p>
                  <div className="flex gap-2 ml-2 mt-1">
                    <p className="text-red-500 font-medium p-1 px-10 rounded-full bg-slate-200"></p>
                    <p className="text-slate-500 line-through p-1 px-10 rounded-full bg-slate-200"></p>
                  </div>
                  <button className="bg-slate-200 text-white px-7 py-5 ml-4 rounded-full transition-colors mt-2 mb-5"></button>
                </div>
              </div>
            ))
          : data.map((product) => {
              const { discountAmount, discountPercentage } = calculateDiscount(
                product.price,
                product.sellingPrice
              );

              return (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="cursor-pointer mt-5 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] overflow-scroll scrollbart-none md:max-w-[350px] bg-white rounded-2xl shadow"
                >
                  <div className="bg-slate-200 h-48 flex items-center justify-center p-3 min-w-[280px] md:min-w-[145px]">
                    <img
                      src={product.ProductImage[0]}
                      className="object-fill h-full hover:scale-110 transition-all mix-blend-darken"
                    />
                  </div>
                  <div className="p-3 grid gap-2">
                    <h2 className="font-medium md:text-lg text-base ml-2 mr-3 mt-1 line-clamp-1">
                      {truncateText(product.productName, 4)}
                    </h2>
                    <p className="capitalize ml-2 mt-0.5 text-slate-600">
                      {product.category}
                    </p>
                    <div className="px-2">
                      <p className="text-lg text-green-600 font-semibold">
                        Extra ₹{discountAmount} off
                      </p>
                      <div className="flex items-center gap-1 my-1">
                        <p className="text-xl font-semibold">
                          {displayCurrency(product.sellingPrice)}
                        </p>
                        <p className="text-base font-medium text-gray-500 line-through">
                          {displayCurrency(product.price)}
                        </p>
                        <p className="text-sm text-green-600 font-semibold">
                          {discountPercentage}% off
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className="bg-blue-600 text-white px-7 py-2.5 ml-4 rounded-full hover:bg-blue-700 transition-colors mt-2 mb-5"
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

export default VerticalCardProduct;
