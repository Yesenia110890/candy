'use strict';

let paramsValidator = require('./../utils/params_validators');
let Event = require('./../models/event');

const EVENT_EXPECTED_PARAMS = [
    'owner',
    'event_date'
];

exports.createEvent = function(request, response, next) {
    const logger = request.log;

    let areValidParams = paramsValidator.validateParams(request.body,
            EVENT_EXPECTED_PARAMS);

    if (!areValidParams) {
        response.send(400, {
            error: {
                status: 400,
                detail: 'Olvidaste uno o mas parametros en la peticion'
            }
        });

        return next();
    }

    let eventObject = {
        owner: request.body.owner,
        event_date: new Date(request.body.event_date)
    };

    if (request.body.description)
        eventObject.description = request.body.description;

    if (request.body.products && Array.isArray(request.body.products))
        eventObject.products = request.body.products;

    let newEvent = new Event(eventObject);

    newEvent.save().then(savedEvent => {
        let responseObject = {
            status: 201,
            event: savedEvent
        }

        response.send(201, responseObject);
        return next();
    }).catch(error => {
        logger.error(`create event: ${error}`);
        response.send(500, {
            error: {
                status: 500,
                detail: error
            }
        });

        return next();
    });
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
