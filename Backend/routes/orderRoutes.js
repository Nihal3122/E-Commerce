import express from "express";
import { verifyjwt } from "../middleware/auth.js";
import { webhooks } from "../controllers/webhook.js";
import { orderController, paymentController } from "../controllers/orderController.js";

const router = express.Router();

router.route("/checkout").post(verifyjwt, paymentController);
router.route("/webhook").post(webhooks);
router.route("/order-list").get(verifyjwt,orderController);

export default router;
