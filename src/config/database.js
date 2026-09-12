const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db;

async function connectDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME || "assignment7");
  console.log("Connected to MongoDB Atlas");
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("DB not connected yet, call connectDB() first");
  }
  return db;
}

module.exports = { connectDB, getDB };
