const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
     //to create uuid-in-javascript
     this.id = [...Array(22)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
     //Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);    
     // Math.random().toString();
     return db.execute(
      'INSERT INTO products (id, title, imageUrl, description, price) VALUES (?, ?, ?, ?, ?)',
      [this.id, this.title, this.imageUrl, this.description, this.price]
    );
  }

  static deleteById(id) {
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  };

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
}