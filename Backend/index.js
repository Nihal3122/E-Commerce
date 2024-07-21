import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./Database/dbConnection.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/CartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config("./env");

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Place the router after the cookieParser middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

const PORT = 8080 || process.env.PORT;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log("Database connected successfully");
    console.log("http://localhost:8080");
  });
});

export default app;
