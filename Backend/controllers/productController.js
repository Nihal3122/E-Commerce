import { uploadeProductPermission } from "../middleware/permission.js";
import { Product } from "../models/productModel.js";

export const uploadProduct = async (req, res) => {
  try {
    const sessionUserId = req?.user;
    if (!uploadeProductPermission(sessionUserId)) {
      return res.json({
        message:
          "You do not have the necessary permissions to upload a product.",
      });
    }

    const uploadProduct = new Product(req?.body);
    const saveProduct = await uploadProduct.save();
    return res.status(201).json({
      message: "Product uploaded",
      success: true,
      saveProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateProducts = async (req, res) => {
  try {
    if (!uploadeProductPermission(req?.user)) {
      return res.json({
        message:
          "You do not have the necessary permissions to update a product.",
      });
    }

    const { _id, ...resBody } = req.body;
    const updateProduct = await Product.findByIdAndUpdate(_id, resBody);
    res.json({
      message: "Product updated",
      success: true,
      updateProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req?.params;
    await Product.findByIdAndDelete(id);

    res.json({
      message: "Product deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getSignleCategoryProduct = async (req, res) => {
  try {
    const productCategory = await Product.distinct("category");

    // array to store one product from each category
    const singleProductByCategory = [];

    for (const category of productCategory) {
      const product = await Product.findOne({ category });
      if (product) {
        singleProductByCategory.push(product);
      }
    }
    res.json({
      message: "Category product",
      singleProductByCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getCategoryWiseProducts = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const categoryWiseProducts = await Product.find({ category });
    res.json({
      success: true,
      categoryWiseProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getProductsDetails = async (req, res) => {
  try {
    const { id } = req?.params;
    const product = await Product.findById(id);
    res.json({
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];
    const products = await Product.find({
      category: {
        $in: categoryList,
      },
    });
    res.json({
      products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
