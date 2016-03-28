'use strict';

exports.createCustomer = function(request, response, next) {
    response.send(200, {OK: 'createCustomer'});
    return next();
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