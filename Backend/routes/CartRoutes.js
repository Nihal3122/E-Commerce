import express from "express";
import {
  addToCart,
  countCartProduct,
  deleteProductFromCart,
  getCartData,
  updateAddToCart,
} from "../controllers/cartController.js";
import { verifyjwt } from "../middleware/auth.js";

const router = express.Router();

router.route("/addToCart").post(verifyjwt, addToCart);
router.route("/countCartProduct").get(verifyjwt, countCartProduct);
router.route("/getCartData").get(verifyjwt, getCartData);
router.route("/update-cart-product").post(verifyjwt, updateAddToCart);
router.route("/delete-cart-product").post(verifyjwt, deleteProductFromCart);

export default router;
