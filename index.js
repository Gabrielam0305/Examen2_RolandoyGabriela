require("dotenv").config();
const usersRoutes = require("./src/users/routes/user.route.js");
const postsRoutes = require("./src/posts/routes/post.route.js");
const MongoConnect = require("./src/config/mongo.js");
const cors = require("cors");
const firebaseConnect = require("./src/config/firebase.js");

const express = require("express");
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

const port = process.env.Port || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", usersRoutes());
app.use("/api/posts", postsRoutes());

app.listen(port, () => {
  console.log("👀 Servidor corriendo ", port);
});
MongoConnect();
