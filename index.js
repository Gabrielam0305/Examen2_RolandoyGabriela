require("dotenv").config();
const usersRoutes = require("./src/users/routes/user.route.js");
const express = require("express");
const Post = require("./src/config/mongo.js");
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
  res.send('Login logic should be implemented on client side.');
});

// Endpoint para hacer logout de un usuario
app.post('/logOut', async (req, res) => {
  res.send('Logout logic should be implemented on client side.');
});

// Endpoint para crear un post
app.post('/createPost', async (req, res) => {
  const { title, content, author } = req.body;
  console.log("Received data:", req.body); // Añadir un log para verificar los datos recibidos

  // Validar que todos los campos requeridos están presentes
  if (!title || !content || !author) {
    return res.status(400).send({ error: "Todos los campos (title, content, author) son obligatorios." });
  }

  try {
    const post = new Post({ title, content, author });
    const savedPost = await post.save();
    res.status(201).send(savedPost);
  } catch (error) {
    console.error("Error saving post:", error); // Añadir un log para verificar el error
    res.status(400).send(error);
  }
});

// Endpoint para listar todos los posts
app.get('/listPost', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Error retrieving posts", details: error.message });
  }
});


// Endpoint para editar un post
app.put('/editPost/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true });
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint para eliminar un post
app.delete('/deletePost/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

//Iniciar
const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});

//dbConnect();
