const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
