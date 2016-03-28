'use strict';

exports.getGreet = function(request, response, next) {
    response.send(200, 'My first example!!!');
    return next();
}
