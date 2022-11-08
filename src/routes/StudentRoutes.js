const express = require('express')
const passport = require("passport")
const studentRoutes = express.Router()
const studentController = require('../controllers/StudentController')

studentRoutes.get('/', passport.authenticate("jwt", {session: false}), studentController.findAll)
studentRoutes.get('/:id', passport.authenticate("jwt", {session: false}), studentController.findById)
studentRoutes.post('/', passport.authenticate("jwt", {session: false}), studentController.addStudent)
studentRoutes.put('/:id', passport.authenticate("jwt", {session: false}), studentController.updateStudent)
studentRoutes.delete('/:id', passport.authenticate("jwt", {session: false}), studentController.deleteStudent)

module.exports = studentRoutes