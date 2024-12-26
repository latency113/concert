const express = require('express');
const app = express.Router();
const controller = require('../controllers/cart.controller');

app.post('/cart', controller.addToCart);
app.get('/cart', controller.getCart);
app.delete('/cart/:id', controller.removeFromCart);
app.delete('/cart/clear', controller.clearCart);

module.exports = app;
