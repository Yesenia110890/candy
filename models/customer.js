'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let customerSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    first_name: String,
    last_name: String,
    age: Number,
    address: String,
    phone: String,
    email: String
}, { collection: 'customers' });

let Customer = mongoose.model('Customer', productSchema);

module.exports = Customer;
