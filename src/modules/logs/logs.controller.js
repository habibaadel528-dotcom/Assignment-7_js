const { getDB } = require("../../config/database");
const { ObjectId } = require("mongodb");

// 7. insert a log, book_id has to be a real ObjectId so aggregate4's $lookup works later
exports.insertLog = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("logs").insertOne({
      book_id: new ObjectId(req.body.book_id),
      action: req.body.action,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
