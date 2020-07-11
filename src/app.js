const path = require('path');
const express = require('express'); // const express is an function not object and is calling  a new instance of express apps
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

console.log(' I AM IN src/app.js');

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath); // customizing the directory
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// setting route to call the page
app.get('', (req, res) => {
  res.render('index', {
    title: 'weather app',
    name: 'Casey',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about Me',
    name: 'Ha',
  });
});

app.get('/help', (req, res) => {
  res.render('HELP', {
    message: ' This is a help section',
    title: 'Help Coding',
    name: 'Ha Hoang',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: ' Please provide an address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'Philidephia',
  //   address: req.query.address,
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term ',
    });
  }

  // http://localhost:3000/products?search=games&rating=5
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  //res.send('Help article not found');});
  res.render('404', {
    title: '404',
    name: 'Ha',
    error_Message: 'Help Article Not Found',
  });
});

app.get('*', (req, res) => {
  //res.send('my 404 error');
  res.render('404', {
    title: '404',
    name: 'Ha',
    error_Message: 'page not found!!!',
  });
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
