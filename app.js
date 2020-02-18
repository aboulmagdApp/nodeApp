const express = require('express');
//import core module to parse all incoming request
const bodyParser = require('body-parser');
// inport path to return application path for static file like css, html...etc
const path = require('path');

// working with login in error controller
const errorController = require('./controllers/error');
const db = require('./util/database');
//create application express
const app = express();

// for use ejs engine
app.set('view engine', 'ejs');
// for tell engine where then view will store in app
app.set('views', 'views');

//declare all app routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// use bodyParser for parse incoming request
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

// use all routes in app
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// handel error page in app
app.use(errorController.get404);

app.listen(3000);