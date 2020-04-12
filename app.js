const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// inport path to return application path for static file like css, html...etc
const path = require('path');


const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

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
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
      }
    User.findById(req.session.user._id)
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
    .connect(
        MONGODB_URI
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