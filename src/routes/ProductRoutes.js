const express = require('express')
const passport = require("passport")
const productRoutes = express.Router()
const productController = require('../controllers/ProductController')
const { checkAdminRole } = require("../middlewares/auth.handler")

productRoutes.get('/', productController.findAll)
productRoutes.get('/:id', productController.findById)
productRoutes.post('/', passport.authenticate("jwt", {session: false}), checkAdminRole, productController.addProduct)
productRoutes.put('/:id', passport.authenticate("jwt", {session: false}), checkAdminRole, productController.updateProduct)
productRoutes.delete('/:id', passport.authenticate("jwt", {session: false}), checkAdminRole, productController.deleteProduct)

module.exports = productRoutes