'use strict';

let paramsValidator = require('./../utils/params_validators');
let Customer = require('./../models/customer');

const CUSTOMER_EXPECTED_PARAMS = [
    'first_name',
    'last_name',
    'phone',
    'age',
    'address',
    'email'
];


exports.createCustomer = function(request, response, next) {
    const logger = request.log;

    let areValidParams = paramsValidator.validateParams(request.body,
            CUSTOMER_EXPECTED_PARAMS);

    if (!areValidParams) {
        response.send(400, {
            error: {
                status: 400,
                detail: 'Olvidaste uno o mas parametros en la peticion'
            }
        });

        return next();
    }

    let newCustomer = new Customer({
        firstName   : request.body.first_name,
        lastName    : request.body.last_name,
        age         : request.body.age,
        phone       : request.body.phone,
        address     : request.body.address,
        email       : request.body.email
    });

    newCustomer.save().then(savedUser => {
        response.send(200, savedUser);
        return next();
    }).catch(error => {
        logger.error(`create customer: ${error}`);
        response.send(500, {
            error: {
                status: 500,
                detail: error
            }
        });

        return next();
    });
}

exports.getCustomers = function(request, response, next) {
    response.send(200, {OK: 'getCustomers'});
    return next();
}

exports.getCustomer = function(request, response, next) {
    response.send(200, {OK: 'getCustomer'});
    return next();
}

exports.deleteCustomer = function(request, response, next) {
    response.send(200, {OK: 'deleteCustomer'});
    return next();
}
