const express = require('express')
const app = express.Router()

const controller = require('../controllers/product.controller')



//localhost:4000/products
app.post('/product', controller.create)
app.get('/product/:id', controller.getById)
app.put('/product/:id', controller.update)
app.delete('/product/:id', controller.delete)
app.post('/productby',controller.orderBy)
app.post('/search/filters',controller.filter)


module.exports = app