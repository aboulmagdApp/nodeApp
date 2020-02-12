const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir,
    'data',
    'products.json'
);

module.exports = class cart{
    constructor(){
        this.products = [];
        this.totalPrice = 0;
    }
}