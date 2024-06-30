const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  dp: { type: String },
  bio: { type: String },
},{timestamps:true});

const userModeler = model("users", userSchema);
module.exports = userModeler;
