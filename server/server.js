const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminProductsRouter = require("./routes/admin/products-routes");
const authRouter = require("./routes/auth/auth-routes");

mongoose
  .connect("mongodb+srv://Hetkalriya:Het123456@cluster0.9hwkb.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

const app = express();
const PORT = 5000;

// Increase timeout limit
// app.use((req, res, next) => {
//   req.setTimeout(120000); // 120 seconds
//   res.setTimeout(120000); // 120 seconds
//   next();
// });

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

app.use("/api/admin/products", adminProductsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
