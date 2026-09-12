const { getDB } = require("../../config/database");

// 5. insert one book
exports.insertOne = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("books").insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6. insert many books
exports.insertBatch = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("books").insertMany(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 8. update year for a book by title
exports.updateYearByTitle = async (req, res) => {
  try {
    const db = getDB();
    const year = req.body.year !== undefined ? Number(req.body.year) : 2022;
    const result = await db.collection("books").updateOne(
      { title: req.params.title },
      { $set: { year: year } }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 9. find a book by title
exports.findByTitle = async (req, res) => {
  try {
    const db = getDB();
    const title = req.query.title || "Brave New World";
    const book = await db.collection("books").findOne({ title: title });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 10. find books published between two years
exports.findByYearRange = async (req, res) => {
  try {
    const db = getDB();
    const from = Number(req.query.from) || 1990;
    const to = Number(req.query.to) || 2010;
    const books = await db
      .collection("books")
      .find({
        year: { $gte: from, $lte: to },
      })
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 11. find books by genre
exports.findByGenre = async (req, res) => {
  try {
    const db = getDB();
    const genre = req.query.genre || "Science Fiction";
    const books = await db
      .collection("books")
      .find({ genres: genre })
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 12. skip 2, limit 3, sort by year desc
exports.skipLimit = async (req, res) => {
  try {
    const db = getDB();
    const books = await db
      .collection("books")
      .find()
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 13. year stored as int32
exports.findYearInteger = async (req, res) => {
  try {
    const db = getDB();
    const books = await db
      .collection("books")
      .find({ year: { $type: "int" } })
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 14. exclude Horror / Science Fiction
exports.excludeGenres = async (req, res) => {
  try {
    const db = getDB();
    const books = await db
      .collection("books")
      .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 15. delete books published before a given year
exports.deleteBeforeYear = async (req, res) => {
  try {
    const db = getDB();
    const year = Number(req.query.year) || 2000;
    const result = await db
      .collection("books")
      .deleteMany({ year: { $lt: year } });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 16. aggregate: filter after 2000, sort desc
exports.aggregate1 = async (req, res) => {
  try {
    const db = getDB();
    const books = await db
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } },
      ])
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 17. aggregate: after 2000, only title/author/year
exports.aggregate2 = async (req, res) => {
  try {
    const db = getDB();
    const books = await db
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } },
      ])
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 18. aggregate: unwind genres
exports.aggregate3 = async (req, res) => {
  try {
    const db = getDB();
    const books = await db
      .collection("books")
      .aggregate([
        { $unwind: "$genres" },
        { $project: { _id: 0, title: 1, genres: 1 } },
      ])
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 19. aggregate: join logs with books
exports.aggregate4 = async (req, res) => {
  try {
    const db = getDB();
    const result = await db
      .collection("logs")
      .aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details",
          },
        },
        {
          $project: {
            _id: 0,
            action: 1,
            "book_details.title": 1,
            "book_details.author": 1,
            "book_details.year": 1,
          },
        },
      ])
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
