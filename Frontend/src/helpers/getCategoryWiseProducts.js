import axios from "axios";

export const getCategoryWiseProduct = async (category) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/products/get-categoryWiseProducts",
      {category},
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
