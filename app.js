const express = require('express');
//import core module to parse all incoming request
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// inport path to return application path for static file like css, html...etc
const path = require('path');

// working with login in error controller
const errorController = require('./controllers/error');
// const User = require('./models/user');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

// this middleware will run every request
// app.use((req, res, next) => {
//     User.findById("5e67beacf53b714b544fbdab")
//         .then(user => {
//             req.user = new User(user.name, user.email, user.cart, user._id) ;
//             next();
//         })
//         .catch(err => console.log(err));
// });
// use all routes in app
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

// handel error page in app
app.use(errorController.get404);

mongoose
    .connect('mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
    ).then(result =>{
        app.listen(3000);
    })
    .catch(err =>{
        console.log(err);
    })