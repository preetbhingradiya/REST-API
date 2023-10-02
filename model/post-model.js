const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      default:"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestemps: true }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
