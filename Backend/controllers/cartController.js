import { Cart } from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUserId = req?.user;

    const isProductAvailable = await Cart.findOne({ productId, userId: currentUserId, });

    if (isProductAvailable) {
      return res.json({
        message: "This product already available in cart",
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUserId,
    };

    const newAddToCart = new Cart(payload);
    const cart = await newAddToCart.save();

    return res.json({
      cart,
      message: "Product added in cart",
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

export const countCartProduct = async (req, res) => {
  try {
    const userId = req.user;
    const count = await Cart.countDocuments({ userId });
    res.json({
      count,
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

export const getCartData = async (req, res) => {
  try {
    const currentUser = req.user;
    const cartData = await Cart.find({ userId: currentUser }).populate(
      "productId"
    );
    res.json({
      cartData,
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

export const updateAddToCart = async (req, res) => {
  try {
    const cartProductId = req.body._id;
    const qty = req.body.quantity;

    // Ensure cartProductId is an object id and qty is valid
    if (!cartProductId || !Number.isInteger(qty)) {
      return res.status(400).json({
        message: "Invalid product ID or quantity",
        success: false,
      });
    }

    // Use the appropriate filter to find the cart item by id
    const updateProduct = await Cart.updateOne(
      { _id: cartProductId },
      { $set: { quantity: qty } }
    );

    if (updateProduct.nModified === 0) {
      return res.status(404).json({
        message: "Product not found or no change in quantity",
        success: false,
      });
    }

    res.json({
      updateProduct,
      message: "Product updated successfully",
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

export const deleteProductFromCart = async (req, res) => {
  try {
    const productId = req.body.id;
    await Cart.findByIdAndDelete(productId);

    res.json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
