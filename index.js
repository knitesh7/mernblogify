//window.location.origin
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/user.js");
const blogsRouter = require("./routes/blogs.js");
const commentRouter = require("./routes/comments.js");
const dotenv = require("dotenv");
const fs = require('fs').promises;
// const convert2base64 = require("./utility/imgtobase64.js")

const connect2db = require("./connection.js");

dotenv.config();

// async function imgtobase64(img){
//   return await convert2base64(img)
// }
// const image = imgtobase64(img)


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


app.use("/api/user", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/comments", commentRouter);

app.get('/logo', async (req, res) => {
  try {
    const imgPath = path.join(__dirname, 'assets', 'blog3.png');
    
    // Read the image file
    const data = await fs.readFile(imgPath);
    
    // Convert the image to a Base64 data URL
    const base64Image = `data:image/png;base64,${Buffer.from(data).toString('base64')}`;
    
    // Respond with the Base64 data URL
    return res.status(200).json({img:base64Image});
  } catch (err) {
    return res.status(500).json({msg:'Error reading image file'});
  }
});

// app.use("/logo",(req,res)=>{
//   return res.sendFile(path.resolve(__dirname,"frontend","dist","assets","blog.png"))
// })

app.use("*", (req, res) => {
  return res.sendFile(
    path.resolve(__dirname, "frontend", "dist","index.html")
  );
});

app.listen(PORT, () => console.log(`Server is fired at PORT : ${PORT}`));
