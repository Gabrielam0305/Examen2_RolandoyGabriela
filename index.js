require("dotenv").config();
const usersRoutes = require("./src/users/routes/user.route.js");
const express = require("express");
const dbConnect = require("./src/config/mongo.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const firebaseConnect = require("./src/config/firebase.js");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", usersRoutes());

// Endpoint para crear un usuario
app.post('/createUser', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });
    res.status(201).send(userRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint para loguear un usuario
app.post('/logIn', async (req, res) => {
  const { email, password } = req.body;
  // Implementa la lógica de autenticación aquí
  // Firebase Authentication no tiene una función directa para logueo en backend, suele hacerse en frontend
  res.send('Login logic should be implemented on client side.');
});

//Iniciar
const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});

//dbConnect();
