const { getDB } = require("../../config/database");

// 1. explicit collection with validation on title
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

// 2. implicit collection, just insert into "authors"
exports.createAuthorsCollection = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("authors").insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. capped collection "logs", 1MB
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

// 4. index on books.title
exports.createBooksIndex = async (req, res) => {
  try {
    const db = getDB();
    const indexName = await db.collection("books").createIndex({ title: 1 });
    res.json(indexName);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
