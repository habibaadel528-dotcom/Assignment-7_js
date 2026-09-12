const { getDB } = require("../config/db");

//1
exports.createBooksCollection = async (req, res) => {
  try {
    const db = getDB();
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "title is required and can't be empty",
            },
          },
        },
      },
    });
    res.json({ ok: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//2
exports.createAuthorsCollection = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("authors").insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//3
exports.createCappedLogs = async (req, res) => {
  try {
    const db = getDB();
    await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });
    res.json({ ok: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//4
exports.createBooksIndex = async (req, res) => {
  try {
    const db = getDB();
    const indexName = await db.collection("books").createIndex({ title: 1 });
    res.json(indexName);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
