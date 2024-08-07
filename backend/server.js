require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const orderRoutes = require("./routes/orderRoutes")

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/category:", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews",reviewRoutes)
app.use("/api/payment-method",paymentMethodRoutes);
app.use("/api/checkout",orderRoutes)


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log("listening to", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
