import axios from "axios";
import { toast } from "react-toastify";

export const addToCart = async (e, productId) => {
  e?.stopPropagation();
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/cart/addToCart`,
      { productId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response?.data?.message);
    console.log(response?.data);
  } catch (error) {
    console.log(error);
  }
};
