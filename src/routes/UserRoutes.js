const express = require('express')
const passport = require("passport")
const userRoutes = express.Router()
const userController = require('../controllers/UserController')
const { checkAdminRole } = require("../middlewares/auth.handler")

userRoutes.get('/', passport.authenticate("jwt", {session: false}), checkAdminRole, userController.findAll)
userRoutes.get('/:id', passport.authenticate("jwt", {session: false}), checkAdminRole, userController.findById)
userRoutes.post('/', passport.authenticate("jwt", {session: false}), checkAdminRole, userController.addUser)
userRoutes.put('/:id', passport.authenticate("jwt", {session: false}), checkAdminRole, userController.updateUser)
userRoutes.delete('/:id', passport.authenticate("jwt", {session: false}), checkAdminRole, userController.deleteUser)

module.exports = userRoutes