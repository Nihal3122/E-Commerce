import React, { useEffect, useState } from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProducts = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const delstopImages = [image1, image2, image3, image4, image5];

  const nextImage = () => {
    if (delstopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const prevImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (delstopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-8  pt-2 rounded">
      <div className="h-48 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-3xl px-4">
            <button
              onClick={prevImage}
              className="bg-white text-gray-700 hover:text-gray-500 rounded-full p-2 transition duration-200 shadow-lg"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white text-gray-700 hover:text-gray-500 rounded-full p-2 transition duration-200 shadow-lgtion-300 shadow-lg"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/*  */}
        <div className="flex h-full overflow-hidden">
          {delstopImages.map((image, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={index}
                style={{ transform: `translate(-${currentImage * 100}%)` }}
              >
                <img src={image} alt="" className="w-full h-full " />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProducts;
