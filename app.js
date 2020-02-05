const http = require('http');
const express = require('express');

//create application express
const app = express();

app.use('/',(req, res, next) =>{
    console.log('this is always run!');
    next(); // Allows the request to continue to the next middleware in line
});

app.use('/add-product',(req, res, next) =>{
    console.log('In the another middleware');
    res.send('<h1>hello from add product!</h1>');
});

app.use('/',(req, res, next) =>{
    console.log('In the another middleware');
    res.send('<h1>hello from express!</h1>');
});
const server = http.createServer(app);

server.listen(3000);
