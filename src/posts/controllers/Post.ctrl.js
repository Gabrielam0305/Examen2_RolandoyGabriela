const PostSchema = require("../models/Post.model");
const userModel = require("../../users/models/users.model");

exports.addNewPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    let userExists = await userModel.find({ correo: author });
    console.log(userExists);
    if (userExists.length > 0) {
      let newPost = new PostSchema(req.body);
      await newPost.save();
      return res.status(200).json({
        msg: "Post creado exitosamente",
      });
    } else {
      return res.status(404).json({
        msg: "Usuario no registrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al crear el Post",
      errorMessage: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find();
    res.status(200).send(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error buscando posts", details: error.message });
  }
};

exports.editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  try {
    const updatedPost = await PostSchema.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );
    res.status(200).json({
      msg: "Post editado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al crear el Post",
      errorMessage: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostSchema.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Post eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al crear el Post",
      errorMessage: error.message,
    });
  }
};
