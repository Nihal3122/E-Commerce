import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/nihal3122/image/upload`;

export const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "Mern_Ecommerce");
  try {
    const response = await axios.post(url, formData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
