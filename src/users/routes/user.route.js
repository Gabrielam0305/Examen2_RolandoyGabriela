const express = require("express");
const { createUser, logIn, logOut } = require("../controllers/users.ctrl.js");
const router = express.Router();

module.exports = function () {
  router.post("/createUser", createUser);
  router.post("/logIn", logIn);
  router.post("/logOut", logOut);
  return router;
};
