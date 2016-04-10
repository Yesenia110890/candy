'use strict';

exports.createEvent = function(request, response, next) {
    response.send(200, { OK: 'createEvent' });
}

exports.getEvents = function(request, response, next) {
    response.send(200, { OK: 'getEvents' });
}

exports.getEvent = function(request, response, next) {
    response.send(200, { OK: 'getEvent' });
}

exports.patchEvent = function(request, response, next) {
    response.send(200, { OK: 'patchEvent' });
}

exports.deleteEvent = function(request, response, next) {
    response.send(200, { OK: 'deleteEvent' });
}
