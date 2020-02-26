const express = require('express');
//import core module to parse all incoming request
const bodyParser = require('body-parser');
// inport path to return application path for static file like css, html...etc
const path = require('path');

// working with login in error controller
const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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
app.use((req, res, next) => {
    User.findByPk('6cq8kt0oi0z4qqgxehnqsz')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
// use all routes in app
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// handel error page in app
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk('6cq8kt0oi0z4qqgxehnqsz')
    })
    .then(user => {
        if (!user) {
            return User.create({ id: '6cq8kt0oi0z4qqgxehnqsz', name: 'aboulmagd', email: 'aboulmagd@live.com' })
        }
        return user;
    })
    .then(user => {
        if (Cart.findByPk('kjzkyf5bdbs6pqkw4o040a')) {
            return;
        } else {
            return user.createCart({ id: 'kjzkyf5bdbs6pqkw4o040a' })
        }
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
