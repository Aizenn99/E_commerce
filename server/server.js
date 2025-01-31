const express = require("express");
const moongose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes")

//create database connection -> u can also
// create a seperate file for this and then import/use that file  for this and import/use that file here
moongose
  .connect("mongodb+srv://Hetkalriya:Het123456@cluster0.9hwkb.mongodb.net/")
  .then(() =>
    console.log("MongoDB connected ")).catch((error) => console.log(error));
  

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-Control ",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use('/api/auth',authRouter);
app.listen(PORT, () => console.log(` server is now running on port ${PORT} `));
