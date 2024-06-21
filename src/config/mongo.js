const mongoose = require("mongoose");

const MongoConnect = async () => {
  const url = process.env.db_url;
  try {
    await mongoose.connect(url);
    console.log("Mongo Atlas connected 🍃");
  } catch (err) {
    console.log("La base de datos ha dado un error:", err);
  }
};

module.exports = MongoConnect;
