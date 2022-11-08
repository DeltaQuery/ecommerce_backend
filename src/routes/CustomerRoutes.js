const express = require('express')
const passport = require("passport") 
const customerRoutes = express.Router()
const customerController = require('../controllers/CustomerController')

customerRoutes.get('/', passport.authenticate("jwt", {session: false}), customerController.findAll)
customerRoutes.get('/:id', passport.authenticate("jwt", {session: false}), customerController.findById)
customerRoutes.post('/', passport.authenticate("jwt", {session: false}), customerController.addCustomer)
customerRoutes.put('/:id', passport.authenticate("jwt", {session: false}), customerController.updateCustomer)
customerRoutes.delete('/:id', passport.authenticate("jwt", {session: false}), customerController.deleteCustomer)

module.exports = customerRoutes
