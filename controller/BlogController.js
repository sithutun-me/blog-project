const Blog = require('../models/Blog.js');

const BlogController = {
  index: async (req, res) => {
    let blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('home', {
      blogs,
      title: 'Home',
    });
  },
  show: async (req, res, next) => {
    try {
      let id = req.params.id;
      let blog = await Blog.findById(id);
      res.render('blogs/show', {
        blog,
        title: 'Blog details',
      });
    } catch (e) {
      console.log(e);
      next();
    }
  },
  store: async (req, res) => {
    let { title, intro, body } = req.body;
    let blog = new Blog({
      title,
      intro,
      body,
    });
    await blog.save();
    res.redirect('/');
  },
  create: (req, res) => {
    res.render('blogs/create', {
      title: 'Blog Create',
    });
  },
  destroy: async (req, res, next) => {
    let id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.redirect('/');
  },
};
module.exports = BlogController;
