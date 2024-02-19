const routes = require('express').Router();
const controller = require("../controller/controller")

routes.route('/api/category')
    .post(controller.create_Categories)
    .get(controller.get_Categories)

routes.route('/api/transaction')
    .post(controller.create_Trasactions)
    .get(controller.get_Transactions)
    .delete(controller.delete_Transaction)

routes.route('/api/labels')
    .get(controller.get_labels) 

routes.route('/api/users')
    .post(controller.create_user)
    

routes.route('/api/user')
    .post(controller.get_user)


module.exports = routes;