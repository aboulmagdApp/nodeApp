const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://aboulmagd:aqtkOcbhYbQD0biM@cluster0-shard-00-00-vjxvu.mongodb.net:27017,cluster0-shard-00-01-vjxvu.mongodb.net:27017,cluster0-shard-00-02-vjxvu.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{ useNewUrlParser: true })
    
        .then(client => {
            console.log('Connected');
            _db = client.db()
            callback();
        })
        .catch(err => console.log(err));
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;