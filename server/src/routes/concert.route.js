const express = require('express')
const app = express.Router()

const controller = require('../controllers/concert.controller')

//localhost:4000/products
app.get('/concerts', controller.get)
app.get('/concert/:id', controller.getById)
app.post('/concerts', controller.create)
app.put('/concert/:id', controller.updateCon)
app.delete('/concert/:id', controller.delete)
app.get('/concert/:id/booking', controller.getBookings)

module.exports = app