const express = require('express');
const app = express.Router();
const controller = require('../controllers/order.controller');


app.post('/order', controller.placeOrder);
app.get('/order', controller.getUserOrders);
app.get('/order/:id', controller.getOrderById);
app.put('/order/:id', controller.updateOrderStatus);
app.delete('/order/:id', controller.cancelOrder);

module.exports = app;
