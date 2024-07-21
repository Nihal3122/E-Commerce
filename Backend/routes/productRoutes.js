import express from "express";
import {
  deleteProducts,
  filterProducts,
  getCategoryWiseProducts,
  getProducts,
  getProductsDetails,
  getSignleCategoryProduct,
  updateProducts,
  uploadProduct,
} from "../controllers/productController.js";
import { verifyjwt } from "../middleware/auth.js";

const router = express.Router();

router.route("/upload-product").post(verifyjwt, uploadProduct);
router.route("/getall-product").get(getProducts);
router.route("/update-product").post(verifyjwt, updateProducts);
router.route("/delete-product/:id").delete(verifyjwt, deleteProducts);
router.route("/get-categoryProduct").get(getSignleCategoryProduct);
router.route("/get-categoryWiseProducts").post(getCategoryWiseProducts);
router.route("/filter-product").post(filterProducts);
router.route("/product-details/:id").get(getProductsDetails);

export default router;
