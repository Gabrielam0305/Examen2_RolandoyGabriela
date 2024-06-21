const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const firebaseApp = require("../../config/firebase");
const userModel = require("../models/users.model");

const createUser = async (req, res) => {
  const auth = getAuth(firebaseApp);
  const { email, password, nombre, apellido } = req.body;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredentials.user.uid;
    const nuevoUsuario = new userModel({
      nombre: nombre,
      apellido: apellido,
      password: password,
      _id: uid,
      correo: email,
    });

    await nuevoUsuario.save();
    res.status(201).json({
      msg: "Nuevo usuario creado:",
      data: userCredentials.user,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error al crear el usuario",
      data: err.message,
    });
  }
};
const logIn = async (req, res) => {
  const auth = getAuth(firebaseApp);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.status(200).json({
      msg: "Sesión inciada",
      data: userCredentials,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Sesión no inciada",
      data: err.message,
    });
  }
};
const logOut = async (req, res) => {
  const auth = getAuth(firebaseApp);
  try {
    await signOut(auth);
    res.status(200).json({
      msg: "Sesión cerrada",
    });
  } catch (err) {
    res.status(500).send("Error al cerrar sesión: " + err.message);
  }
};

module.exports = { createUser, logIn, logOut };
