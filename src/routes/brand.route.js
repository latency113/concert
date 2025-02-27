const express = require('express')
const app = express.Router()
const controller = require('../controllers/brand.controller')

//localhost:4000/products
app.get('/brands', controller.get)
app.get('/brand/:id', controller.getById);
app.post('/brand', controller.create)
app.put('/brand/:id', controller.update)
app.delete('/brand/:id', controller.delete)

module.exports = app