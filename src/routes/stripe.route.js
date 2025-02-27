const express = require('express');
const app = express.Router();
const controller = require('../controllers/stripe.controller');
const { authCheck, adminCheck } = require('../middlewares/middleware')



app.post('/user/checkout', authCheck,controller.Checkout);
app.get('/user/checkout-status/:session', authCheck,controller.CheckoutStatus);


module.exports = app;
