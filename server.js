const express = require("express");
const { connectDB } = require("./config/db");
const collectionRoutes = require("./routes/collectionRoutes");
const bookRoutes = require("./routes/bookRoutes");
const logRoutes = require("./routes/logRoutes");
const app = express();
app.use(express.json());
app.use("/collection", collectionRoutes);
app.use("/books", bookRoutes);
app.use("/logs", logRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
