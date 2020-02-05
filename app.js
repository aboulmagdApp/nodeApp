const express = require('express');
const bodyParser = require('body-parser');
//create application express
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// use bodyParser for parse incoming request
app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
