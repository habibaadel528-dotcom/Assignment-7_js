const express = require("express");

const collectionRoutes = require("./modules/collection/collection.routes");
const bookRoutes = require("./modules/books/books.routes");
const logRoutes = require("./modules/logs/logs.routes");

const app = express();
app.use(express.json());

app.use("/collection", collectionRoutes);
app.use("/books", bookRoutes);
app.use("/logs", logRoutes);

module.exports = app;
