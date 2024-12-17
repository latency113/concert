// import ....
const express = require('express')
const { authCheck } = require('../middleware/authMiddleware')
const app = express.Router()
// import controller
const { getOrderAdmin, changeOrderStatus } = require('../controllers/admin.controller')


app.put('/admin/order-status', authCheck, changeOrderStatus)
app.get('/admin/orders', authCheck, getOrderAdmin)


module.exports = app