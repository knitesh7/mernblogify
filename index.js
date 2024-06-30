//window.location.origin
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/user.js");
const blogsRouter = require("./routes/blogs.js");
const commentRouter = require("./routes/comments.js");
const dotenv = require("dotenv");
dotenv.config();
const connect2db = require("./connection.js");

const URI = process.env.URI || `mongodb://127.0.0.1:27017/mernblogdb`;

connect2db(URI)
  .then(() => console.log(`Connected to DB`))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.static(path.resolve(__dirname, "frontend","dist")));
// app.use(express.static(path.resolve(__dirname, "frontend","dist","assets")));

app.use("/api/user", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/comments", commentRouter);

// app.use("/logo",(req,res)=>{
//   return res.sendFile(path.resolve(__dirname,"frontend","dist","assets","blog.png"))
// })

app.use("*", (req, res) => {
  return res.sendFile(
    path.resolve(__dirname, "frontend", "dist","index.html")
  );
});

app.listen(PORT, () => console.log(`Server is fired at PORT : ${PORT}`));
