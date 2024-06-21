const express = require("express");
const {
  addNewPost,
  getPosts,
  editPost,
  deletePost,
} = require("../controllers/Post.ctrl");
// const { validatorCreateItem } = require("../validators/ejemplo.js");
const router = express.Router();

module.exports = function () {
  router.post("/creatPost", addNewPost);
  router.get("/listPost", getPosts);
  router.put("/editPost/:id", editPost);
  router.delete("/deletePost/:id", deletePost);

  return router;
};
