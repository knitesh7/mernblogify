const commentModeler = require("../models/comment");
const moment = require("moment");
const commentsFetcher = async (req, res) => {
  const commentArr = await commentModeler
    .find({ on: req.params._id })
    .populate({
      path: "commenter",
      select: "name",
    }).lean();
  return res.status(200).json({ commentArr:commentArr.map(x=>({...x,createdAt:moment(x.createdAt).format("LLL")})) });
};
const commentadder = async (req, res) => {
  const { comment, _id } = req.body;
  await commentModeler.create({
    val: comment,
    commenter: req.user._id,
    on: _id,
  });
  const commentArr = await commentModeler.find({on: _id}).populate({
    path: "commenter",
    select: "name",
  }).lean();
  return res.status(200).json({ commentArr:commentArr.map(x=>({...x,createdAt:moment(x.createdAt).format("LLL")})) });
};
module.exports = { commentadder, commentsFetcher };
