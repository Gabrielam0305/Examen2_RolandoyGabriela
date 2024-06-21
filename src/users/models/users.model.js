const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  _id: {
    type: String,
    trim: true,
  },
  correo: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Usuarios", userModel);
