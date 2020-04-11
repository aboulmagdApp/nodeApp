const express = require('express');
//import core module to parse all incoming request
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// inport path to return application path for static file like css, html...etc
const path = require('path');

// working with login in error controller
const errorController = require('./controllers/error');
const User = require('./models/user');

//create application express
const app = express();

// for use ejs engine
app.set('view engine', 'ejs');
// for tell engine where then view will store in app
app.set('views', 'views');

//declare all app routes
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
 const authRoutes = require('./routes/auth');

// use bodyParser for parse incoming request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

//this middleware will run every request
app.use((req, res, next) => {
    User.findById("5e87d25a0c7a0a2404f4f42e")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

// use all routes in app
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
 app.use(authRoutes);

// handel error page in app
app.use(errorController.get404);

mongoose
    .connect('mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
    ).then(result =>{
        User.findOne().then(user =>{
            if(!user){
                const user = new User({
                    name: 'aboulmagd',
                    email: 'aboulmagd@live.com',
                    cart:{
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000);
    })
    .catch(err =>{
        console.log(err);
    })