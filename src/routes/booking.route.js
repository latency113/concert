const express = require('express')
const app = express.Router()

const controller = require('../controllers/booking.controller')
const { authCheck, adminCheck } = require('../middlewares/middleware')

//localhost:4000/products
app.get('/bookings', controller.get)
app.get('/booking/user/:id', controller.getById);
app.post('/bookings',authCheck, controller.createBooking)
app.put('/booking/:id', controller.updateBooking)
app.delete('/booking/:id', controller.deleteBooking)

module.exports = app