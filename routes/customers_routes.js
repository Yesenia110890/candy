'use strict';

let customersController = require('./../controllers/customers_controller');

module.exports = function(server) {
    server.post('/customers', customersController.createCustomer);
    server.get('/customers', customersController.getCustomers);
    server.get('/customers/:customerId', customersController.getCustomer);
    server.del('/customers/:customerId', customersController.deleteCustomer);
}