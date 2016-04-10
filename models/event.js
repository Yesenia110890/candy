'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'Customer' },
    event_date: Date,
    description: { type: String, default: '' },
    products: [ {type: Array, default: []} ]
}, { collection: 'events' });

let Event = mongoose.model('Event', eventSchema);
module.exports = Event;
