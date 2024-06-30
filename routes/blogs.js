const express = require("express");
const blogsRouter = express.Router();
const isLoggedIn = require("../middlewares/isloggedin");

const {
  allblogsfetcher,
  userblogsfetcher,
  blogfetcher,
  blogadder,
  blogdeleter,
  bloglikesadder,
  bloglikesfetcher,
  bloglikedeleter,
  blogEditor
} = require("../controllers/blogs");

blogsRouter
  .get("/all", isLoggedIn, allblogsfetcher)
  .get("/", isLoggedIn, userblogsfetcher)
  .get("/:id", isLoggedIn, blogfetcher)
  .post("/", isLoggedIn, blogadder)
  .delete("/:id", isLoggedIn, blogdeleter)
  .post("/likes", isLoggedIn, bloglikesadder)
  .delete("/likes/:id", isLoggedIn, bloglikedeleter)
  .get("/likes/:id", isLoggedIn, bloglikesfetcher)
  .patch("/",isLoggedIn,blogEditor)

module.exports = blogsRouter;
