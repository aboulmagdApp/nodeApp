const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
//create application express
const app = express();

// use bodyParser for parse incoming request
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',(req, res, next) =>{
    console.log('this is always run!');
    next(); // Allows the request to continue to the next middleware in line
});

app.use('/add-product',(req, res, next) =>{
   // console.log('In the another middleware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
});

app.use('/product',(req, res, next) =>{
    console.log(req.body);
    res.redirect('/');

});
app.use('/',(req, res, next) =>{
    //console.log('In the another middleware');
    res.send('<h1>hello from express!</h1>');
});
const server = http.createServer(app);

server.listen(3000);
