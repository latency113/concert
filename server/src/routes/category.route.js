const express = require('express')
const app = express.Router()

const controller = require('../controllers/category.controller')

//localhost:4000/products
app.get('/categories', controller.get)

//localhost:4000/products
app.post('/categories', controller.create)
app.get('/categories/:id', controller.getById)
app.put('/categories/:id', controller.update)
app.delete('/categories/:id', controller.delete)

module.exports = app