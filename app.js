const express = require('express');
//import core module to parse all incoming request
const bodyParser = require('body-parser');
// inport path to return application path for static file like css, html...etc
const path = require('path');

//create application express
const app = express();

// for use ejs engine
app.set('view engine', 'ejs');
// for tell engine where then view will store in app
app.set('views', 'views');

//declare all app routes
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// use bodyParser for parse incoming request
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

// use all routes in app
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// handel error page in app
app.use('/',(req, res, next) =>{
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(404).render('404',{pageTitle: 'Page Not Found'});
});

app.listen(3000);