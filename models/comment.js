const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  val: { type: String, required: true },
  commenter: { type: Schema.Types.ObjectId, ref: "users", required: true },
  on: { type: Schema.Types.ObjectId,ref:"blogs" ,required: true}
},{timestamps:true});

const commentModeler = model("comments", commentSchema);

module.exports = commentModeler;
