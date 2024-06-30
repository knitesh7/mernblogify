const express = require("express");
const commentsRouter = express.Router();
const isLoggedIn = require("../middlewares/isloggedin");

const {commentadder,commentsFetcher} = require("../controllers/comments.js")

commentsRouter
  .post("/add", isLoggedIn, commentadder)
  .get("/:_id", isLoggedIn, commentsFetcher)
  

module.exports = commentsRouter;
