const mongoose = require("mongoose");

const dbConnect = async () => {
  const url = process.env.db_url;
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.log("La base de datos ha dado un error:", err);
  }
};

module.exports = dbConnect;
