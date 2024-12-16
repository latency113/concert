const express = require('express')
const app = express.Router()

const controller = require('../controllers/customer.controller')

//localhost:4000/products
app.get('/', controller.get)

//localhost:4000/products
app.get('/:id', controller.getById)

app.get('/name/:name', controller.getName)
app.post('/', controller.create)
app.put('/:id', controller.editName)
app.patch('/:id', controller.patch)
app.delete('/:id', controller.rmCustomer)




module.exports = app