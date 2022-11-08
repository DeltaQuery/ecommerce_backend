const express = require('express')
const passport = require("passport")
const invoiceRoutes = express.Router()
const invoiceController = require('../controllers/InvoiceController')

invoiceRoutes.get('/', passport.authenticate("jwt", {session: false}), invoiceController.findAll)
invoiceRoutes.get('/:id', passport.authenticate("jwt", {session: false}), invoiceController.findById)
invoiceRoutes.post('/', passport.authenticate("jwt", {session: false}), invoiceController.addInvoice)
invoiceRoutes.put('/:id', passport.authenticate("jwt", {session: false}), invoiceController.updateInvoice)
invoiceRoutes.delete('/:id', passport.authenticate("jwt", {session: false}), invoiceController.deleteInvoice)

module.exports = invoiceRoutes
