const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));
// Middleware
app.use(express.json());
app.use(cors());

// Routes
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
app.use("/products", productRoutes);
app.use("/users", userRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
