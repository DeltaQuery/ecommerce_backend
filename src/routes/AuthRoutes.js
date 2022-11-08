const express = require('express')
const authRoutes = express.Router()
const authController = require('../controllers/AuthController')
const passport = require("passport") 
require("../utils/auth/index")

authRoutes.post('/login', passport.authenticate("local", {session: false}), authController.login)

module.exports = authRoutes