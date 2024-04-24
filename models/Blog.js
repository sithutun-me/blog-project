const mongoose = require('mongoose');

let BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      reqiured: true,
    },
    intro: {
      type: String,
      reqiured: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
