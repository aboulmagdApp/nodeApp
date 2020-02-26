const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://aboulmagd:Qia13MZD2D0aV8z3@cluster0-vjxvu.mongodb.net/test?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected');
            callback(client);
        })
        .catch(err => console.log(err));
};

module.exports = mongoConnect;