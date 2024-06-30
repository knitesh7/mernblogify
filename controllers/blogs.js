const blogModeler = require("../models/blog");
const blogEditor = async (req, res) => {
  const { _id, temp } = req.body;
  await blogModeler.findByIdAndUpdate(_id, temp);
  return res.status(200).json({ msg: "Updated Succesfully" });
};
const allblogsfetcher = async (req, res) => {
  const blogsArr = await blogModeler.find().populate({
    path: "author",
    select: "_id name",
  });
  return res.status(200).json({ blogsArr });
};
const userblogsfetcher = async (req, res) => {
  const userblogsArr = await blogModeler
    .find({ author: req.user._id })
    .populate({
      path: "author",
      select: "_id name",
    });
  return res.status(200).json({ userblogsArr });
};

const blogfetcher = async (req, res) => {
  const id = req.params.id;
  const blog = await blogModeler.findOne({ id });
  return res.status(200).json({ blog });
};
const blogadder = async (req, res) => {
  await blogModeler.create({ ...req.body, author: req.user._id });
  return res.status(200).json({ msg: "Added Sucessfully" });
};
const allblogsdeleter = async (req, res) => {
  await blogModeler.deleteMany({ author: req.user._id });
  return res.status(200).json({ msg: "Deleted Sucessfully" });
};
const blogdeleter = async (req, res) => {
  const _id = req.params.id;
  await blogModeler.findByIdAndDelete(_id);
  return res.status(200).json({ msg: "Deleted Sucessfully" });
};
const bloglikesadder = async (req, res) => {
  const _id = req.body._id;
  const { likers } = await blogModeler
    .findOneAndUpdate(
      { _id },
      { $addToSet: { likers: req.user._id } },
      { new: true }
    )
    .populate({
      path: "likers",
      select: "_id name",
    })
    .lean();

  return res.status(200).json({ likers });
};

const bloglikesfetcher = async (req, res) => {
  const _id = req.params.id;
  const { likers } = await blogModeler
    .findById(_id, { _id: 0, likers: 1 })
    .populate({
      path: "likers",
      select: "_id name",
    })
    .lean();
  return res.status(200).json({ likers });
};
const bloglikedeleter = async (req, res) => {
  const _id = req.params.id;
  const { likers } = await blogModeler
    .findOneAndUpdate(
      { _id },
      { $pull: { likers: req.user._id } },
      { new: true }
    )
    .populate({
      path: "likers",
      select: "_id name",
    })
    .lean();
  return res.status(200).json({ likers });
};

module.exports = {
  allblogsfetcher,
  blogfetcher,
  blogadder,
  blogdeleter,
  bloglikesadder,
  allblogsdeleter,
  userblogsfetcher,
  bloglikesfetcher,
  bloglikedeleter,
  blogEditor,
};
