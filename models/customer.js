'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let customerSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    phone: String,
    email: String
}, { collection: 'customers' });

let Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
