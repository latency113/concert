const express = require('express')
const app = express.Router()

const controller = require('../controllers/admin.controller')

//localhost:4000/products
app.get('/admin/orders', controller.getOrder)
app.get('/admin/user-stats', controller.getStatus)
app.put('/user/order', controller.updateStatus)

module.exports = app