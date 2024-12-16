const express = require('express')
const app = express.Router()

const controller = require('../controllers/category.controller')

//localhost:4000/products
app.get('/', controller.get)

//localhost:4000/products
app.get('/:id', controller.getById)

module.exports = app