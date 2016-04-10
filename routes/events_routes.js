'use strict';

let eventsController = require('./../controllers/events_controller');

module.exports = function(server) {
    server.post('/events', eventsController.createEvent);
    server.get('/events', eventsController.getEvents);
    server.get('/events/:eventId', eventsController.getEvent);
    server.patch('/events/:eventId', eventsController.patchEvent);
    server.del('/events/:eventId', eventsController.deleteEvent);
}
