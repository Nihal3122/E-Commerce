import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    brandName: {
      type: String,
    },
    category: {
      type: String,
    },
    ProductImage: [],
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
