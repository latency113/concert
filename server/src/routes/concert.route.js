const express = require('express')
const app = express.Router()

const controller = require('../controllers/concert.controller')

//localhost:4000/products
app.get('/concert', controller.get)

module.exports = app