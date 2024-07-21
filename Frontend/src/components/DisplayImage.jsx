import React from "react";
import { IoMdClose } from "react-icons/io";


const DisplayImage = ({ imageURL, onClose }) => {
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-opacity-100" onClick={handleBackdropClick}>
      <div className="bg-white shadow-md rounded max-w-3xl w-[80%] mx-auto p-4   ">
        <div
          className="w-fit text-2xl cursor-pointer duration-300 transform hover:text-blue-600 hover:scale-110 transition-all ml-auto "
          onClick={onClose}
        >
          <IoMdClose />
        </div>
        <div className=" ml-20 p-4 max-w-[80vh] max-h-[80vh]">
          <img src={imageURL} alt="Image" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
