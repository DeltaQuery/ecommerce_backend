const express = require('express')
const passport = require("passport")
const orderRoutes = express.Router()
const orderController = require('../controllers/OrderController')

//Aca hay que añadir una capa extra de autorización para que el usuario SOLO pueda ver sus Órdenes. Y SOLO pueda modificar sus órdenes.
orderRoutes.get('/', passport.authenticate("jwt", {session: false}), orderController.findAll)
orderRoutes.get('/:id', passport.authenticate("jwt", {session: false}), orderController.findById)
orderRoutes.post('/', passport.authenticate("jwt", {session: false}), orderController.addInvoice)
orderRoutes.put('/:id', passport.authenticate("jwt", {session: false}), orderController.updateInvoice)
orderRoutes.delete('/:id', passport.authenticate("jwt", {session: false}), orderController.deleteInvoice)

module.exports = orderRoutes
