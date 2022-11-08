const express = require('express')
const passport = require("passport")
const productRoutes = express.Router()
const productController = require('../controllers/ProductController')

productRoutes.get('/', passport.authenticate("jwt", {session: false}), productController.findAll)
productRoutes.get('/:id', passport.authenticate("jwt", {session: false}), productController.findById)
productRoutes.post('/', passport.authenticate("jwt", {session: false}), productController.addProduct)
productRoutes.put('/:id', passport.authenticate("jwt", {session: false}), productController.updateProduct)
productRoutes.delete('/:id', passport.authenticate("jwt", {session: false}), productController.deleteProduct)

module.exports = productRoutes