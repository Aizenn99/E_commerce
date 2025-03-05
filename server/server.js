const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const shoppingproductsRouter = require("./routes/shop/products-routes");
const shoppingcartRouter = require("./routes/shop/cart-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const authRouter = require("./routes/auth/auth-routes");


mongoose
  .connect("mongodb+srv://Hetkalriya:Het123456@cluster0.9hwkb.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.json({ limit: "50mb" })); // Allow large payloads
app.use("/api/shop/products", shoppingproductsRouter);
app.use("/api/shop/cart", shoppingcartRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
