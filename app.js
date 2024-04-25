const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const blogRouter = require('./route/blogRoutes');

app.use(express.urlencoded({ extended: true })); //Body Parser

const ejs = require('ejs');
const mongoose = require('mongoose');

const port = 3000;
const mongoUrl = 'mongodb://localhost:27017/blog';

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to db');
    app.listen(port, (e) => {
      if (e) {
        console.log(e);
      } else {
        console.log(`Server running on port ${port}`);
      }
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayouts); //Layout support for ejs in express

app.set('layout', 'layouts/default');

app.use(morgan('dev')); //Morgan is a logging tool (middleware) that can be used in HTTP servers implemented using Express & Node. js.
app.use(express.static('public'));

app.get('/', async (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
  });
});

app.use('/blogs/', blogRouter);
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404',
  });
});
