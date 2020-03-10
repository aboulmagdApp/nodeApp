const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db.collection('sers').insertOne(this);
    }

    static findById(userId){
        const db = getDb();
        return db.collection('users').fins({_id: new ObjectId(userId)})

    }
}

module.exports = User;