const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY
const isLoggedIn = (req, res, next) => {
    const clienttoken = req.headers["authorization"];
    if(!clienttoken)return res.status(400).json({msg:"User not signed in..",validtoken: false})
    const decoded = jwt.verify(clienttoken, SECRET_KEY);
    if (!decoded)
      return res.status(400).json({ msg: "Invalid token", validtoken: false });
    req.user = { ...decoded, validtoken: true };
    next();
  };

module.exports = isLoggedIn  