'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'Client' },
    eventDate: Date,
    description: String,
    products: [ {type: Array, default: []} ]
}, { collection: 'events' });

let Event = mongoose.model('Event', eventSchema);
module.exports = Event;
