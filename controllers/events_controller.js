'use strict';

let paramsValidator = require('./../utils/params_validators');
let Event = require('./../models/event');

const EVENT_EXPECTED_PARAMS = [
    'owner',
    'event_date'
];

const CUSTOMER_POPULATE_STRING = 'firstName lastName age address phone email';

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
    const logger = request.log;

    Event.find({})
         .populate('owner', CUSTOMER_POPULATE_STRING)
         .exec()
         .then(events => {
        let responseObject = {
            status: 200,
            events: events
        };

        response.send(200, responseObject);
        return next();
    }).catch(error => {
        logger.error(`delete customer: ${error}`);
        response.send(500, {
            status: 500,
            error: {
                detail: error
            }
        });

        return next();
    });
}

exports.getEvent = function(request, response, next) {
    const logger = request.log;

    let eventQuery = {
        _id: request.params.eventId
    };

    Event.findOne(eventQuery)
         .populate('owner', CUSTOMER_POPULATE_STRING)
         .exec()
         .then(event =>{
        if (!event) {
            logger.error('delete event: event not found');
            response.send(404, {
                status: 404,
                error: {
                    detail: 'Evento no encontrado'
                }
            });

            throw new Error();
        }

        let responseObject = {
            status: 200,
            event: event
        };

        response.send(200, responseObject);
        return next();
    }).catch(error => {
        logger.error(`get Event: ${error}`);
        response.send(500, {
            status: 500,
            error: {
                detail: error
            }
        });
        return next();
    });
}

exports.patchEvent = function(request, response, next) {
    response.send(200, { OK: 'patchEvent' });
}

exports.deleteEvent = function(request, response, next) {
    const logger = request.log;


    let eventQuery = {
        _id: request.params.eventId
    };

    Event.findOne(eventQuery).exec().then(event => {

        if (!event) {
            logger.error('delete event: event not found');
            response.send(404, {
                status:404,
                error: {
                    detail: 'Evento no encontrado'
                }
            });

            throw new Error();
        }

        return event.remove();

    }).then(deletedEvent => {

        let responseObject = {
            status: 200,
            event: deletedEvent
        };

        response.send(200, responseObject);
        return next();
    }).catch(error => {
        logger.error(`delete event: ${error}`);
        response.send(500, {
            status:500,
            error: {
                detail: error
            }
        });

        return next();
    });
}

exports.getEventAvailability = function(request, response, next) {
    const logger = request.log;

    let availabilityQuery = {
        event_date: request.query.date
    };

    Event.findOne(availabilityQuery)
         .exec()
         .then(foundEvent =>{
        if (foundEvent) {
            logger.error('delete event: event not found');
            response.send(404, {
                status: 404,
                error: {
                    detail: 'No Disponible'
                }
            });

            throw new Error();
        }

        let responseObject = {
            status: 200,
            detail: 'Disponible'
        };

        response.send(200, responseObject);
        return next();
    }).catch(error => {
        logger.error(`get Event: ${error}`);
        response.send(500, {
            status: 500,
            error: {
                detail: error
            }
        });
        return next();
    });
}
