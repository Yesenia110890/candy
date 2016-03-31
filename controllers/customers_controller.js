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

    newCustomer.save().then(savedCustomer => {
        let responseObject = {
               status: 200,
               customer: savedCustomer
        }

        response.send(200, responseObject);

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
    const logger = request.log;

    /*
     * El parentesis vacio dentro de find() indica que se traiga a todos los
     * clientes, una vez que termina la consulta, se entra a la seccion 'then'
     * donde se puede acceder a los clientes encontrados, los llame
     * 'foundCustomers'
     */
    Customer.find({}).exec().then(foundCustomers => {
        let responseObject = {
            status: 200,
            customers: foundCustomers
        }

        response.send(200, responseObject);
        return next();
    }).catch(error => {
        logger.error(`get customers: ${error}`);
        response.send(500, {
            error: {
                status: 500,
                detail: error
            }
        });

        return next();
    });
}

exports.getCustomer = function(request, response, next) {
    const logger = request.log;

    let customerQuery = {
        email: request.params.email
    };

    Customer.findOne(customerQuery).exec().then(customer => {
        /*
         * Este if se ejecuta si la busqueda del cliente no arroja resultados,
         * es decir, que el cliente no existe, entonces devolvemos un 404.
         */
        if (!customer) {
            logger.error(`delete customer: customer not found`);
            response.send(404, {
                status: 404,
                error: {
                    detail: 'Cliente no encontrado'
                }
            });

            /*
             * Esta linea nos manda a la clausula catch, para que no se
             * siga ejecutando lo demas.
             */
            throw new Error();
        }

        /*
         * En este punto, no se entro al if, entonces significa que si se
         * encontro al usuario y lo devolvemos en la respuesta.
         */

         let responseObject = {
             status: 200,
             customer: customer
         };

         response.send(200, responseObject);
         return next();
    }).catch(error => {
        logger.error(`get customer: ${error}`);
        response.send(500, {
            error: {
                status: 500,
                detail: error
            }
        });

        return next();
    });
}

exports.deleteCustomer = function(request, response, next) {
    const logger = request.log;

    let customerQuery = {
        _id: request.params.customerId
    };

    Customer.findOne(customerQuery).exec().then(customer => {
        /*
         * Este if se ejecuta si la busqueda del cliente no arroja resultados,
         * es decir, que el cliente no existe, entonces devolvemos un 404.
         */
        if (!customer) {
            logger.error(`delete customer: customer not found`);
            response.send(404, {
                status: 404,
                error: {
                    detail: 'Cliente no encontrado'
                }
            });

            /*
             * Esta linea nos manda a la clausula catch, para que no se
             * siga ejecutando lo demas.
             */
            throw new Error();
        }

        /*
         * Si no se ejecuta el if, significa que el cliente si existe y podemos
         * eliminarlo. Esta linea regresa una promesa (un hilo) que se
         * atrapara en el siguiente 'then'
         */
        return customer.remove();
    }).then(deletedCustomer => {
        /*
         * Al entrar aqui, significa que la linea 'return customer.remove()' fue
         * satisfactoria. La instruccion 'customer.remove' regresa al cliente
         * que fue eliminado, y en este 'then' lo llamamos 'deletedCustomer'.
         *
         * Generalmente, cuando un elemento es eliminado, se devuelve junto
         * con la respuesta, por eso lo incluyo en el responseObject. Nota:
         * el atributo 'customer' de 'responseObject' envia al cliente que se
         * elimino de la BD. En este punto el
         */
        let responseObject = {
            status: 200,
            customer: deletedCustomer
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
