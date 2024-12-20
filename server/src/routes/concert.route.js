const express = require('express')
const app = express.Router()

const controller = require('../controllers/concert.controller')

//localhost:4000/products
app.post('/concerts', controller.create)

module.exports = app