const express = require('express')
const rateRoutes = express.Router()
const rateController = require('../controllers/RateController')

rateRoutes.get('/', rateController.getBcvRate )

module.exports = rateRoutes