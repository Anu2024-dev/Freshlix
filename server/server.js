// import cookieParser from "cookie-parser";
// import express from "express";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import "dotenv/config";
// import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import productRouter from "./routes/productRoute.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import { stripeWebhooks } from "./controllers/orderController.js";
// const app = express();
// const port = process.env.PORT || 4000;
// await connectDB();
// await connectCloudinary();
// //Allow multiple origins
// const allowedOrigins = ["http://localhost:5173", /\.vercel\.app$/];
// app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);
// //Middleware configuration
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.get("/", (req, res) => res.send("API is Working"));
// app.use("/api/user", userRouter);
// app.use("/api/seller", sellerRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/address", addressRouter);
// app.use("/api/order", orderRouter);
// app.listen(port, () => {
//   console.log(`Server is runnning on http://localhost:${port}`);
// });
///new
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://freshlix-frontend.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin || allowedOrigins.includes(origin)) {
    return true;
  }

  if (process.env.NODE_ENV !== "production") {
    return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
  }

  return /^https:\/\/[\w-]+\.vercel\.app$/.test(origin);
};

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

// Stripe webhook
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("API is Working"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
