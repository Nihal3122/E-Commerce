import Stripe from "stripe";
import { Order } from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET;

async function getLineItems(lineitems) {
  let productItems = [];
  if (lineitems?.data?.length) {
    for (const item of lineitems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      productItems.push(productData);
    }
  }
  return productItems;
}

export const webhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getLineItems(line_items);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_option: session.shipping_options.map((p) => ({
          ...p,
          shipping_amount: p.shipping_amount / 100,
        })),

        totalAmount: session.amount_total / 100,
      };
      const order = new Order(orderDetails);
      const saveOrder = await order.save();
      if (saveOrder?.id) {
        const removeCartItems = await Cart.deleteMany({
          userId: session.metadata.userId,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send();
};
