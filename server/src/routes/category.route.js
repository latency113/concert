const express = require('express')
const app = express.Router()

const controller = require('../controllers/category.controller')

//localhost:4000/products
app.get('/catagories', controller.get)

//localhost:4000/products
app.get('/catagories/:id', controller.getById)

module.exports = app