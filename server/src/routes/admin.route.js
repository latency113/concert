const express = require('express')
const app = express.Router()

const controller = require('../controllers/admin.controller')

//localhost:4000/products
app.get('/admin', controller.get)

module.exports = app