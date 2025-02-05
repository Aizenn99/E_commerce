const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes"); // ✅ Correct import

mongoose
  .connect("mongodb+srv://Hetkalriya:Het123456@cluster0.9hwkb.mongodb.net/")
  .then(() => console.log("MongoDB connected "))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/admin/products", adminProductsRouter); // ✅ Corrected route path
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
