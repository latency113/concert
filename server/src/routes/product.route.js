const express = require('express')
const app = express.Router()

const controller = require('../controllers/product.controller')

//localhost:4000/products
app.get('/', controller.get)

//localhost:4000/products
app.get('/:id', controller.getById)

app.post('/', controller.create)
app.put('/:id', controller.update)
app.delete('/:id', controller.delete)
app.post('/orderBy',controller.orderBy)
app.post('/filter',controller.filter)
app.get('/stock/:stock',controller.stock)


module.exports = app