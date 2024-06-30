const { model, Schema } = require("mongoose");

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "users", required: true },
  img: { type: String },
  likers:[{ type: Schema.Types.ObjectId, ref: "users" }]
},{timestamps:true});

const blogModeler = model("blogs", blogSchema);

module.exports = blogModeler;
