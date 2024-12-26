const express = require('express')
const app = express.Router()

const controller = require('../controllers/booking.controller')

//localhost:4000/products
app.get('/booking', controller.get)
app.get('/booking/user/:id', controller.getById);
app.post('/booking', controller.createBooking)
app.put('/booking/:id', controller.updateBooking)
app.delete('/booking/:id', controller.deleteBooking)

module.exports = app