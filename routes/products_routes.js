'use strict';

let productsController = require('./../controllers/products_controller');

module.exports = function(server) {
    server.get('/v1/products', productsController.getGreet);
}
