import Stripe from "stripe";
import { User } from "../models/userModel.js";
import { Order } from "../models/orderModel.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1PdmnDEqva2U2rnahZLRI7JW" }],
      customer_email: user.email,
      metadata: {
        userId: req.user,
      },
      line_items: cartItems.map((item) => {
        const productImages = Array.isArray(item.productId.ProductImage)
          ? item.productId.ProductImage
          : [item.productId.ProductImage];
        const validImages = productImages.filter(
          (img) => img && typeof img === "string" && img.trim() !== ""
        );

        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: validImages,
              metadata: {
                productId: item.productId._id.toString(),
              },
            },
            unit_amount: item.productId.sellingPrice * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const orderController = async (req, res) => {
  try {
    const currentUserId = req?.user;
    const orderList = await Order.find({ userId: currentUserId })
      .sort({ createdAt: -1 })
      .exec();

    if (!orderList.length) {
      return res.status(404).json({
        message: "No orders found for this user.",
        success: true,
        orderList: [],
      });
    }

    res.status(200).json({
      orderList,
      message: "Order List",
      success: true,
    });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};
