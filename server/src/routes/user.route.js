const express = require('express');
const app = express.Router();

const controller = require('../controllers/user.controller');


// ใช้ middleware `verifyToken` ในการตรวจสอบ token
app.get('/users', controller.get); // Get all users  
app.get('/user/:id', controller.getById); //Get user by ID  
app.put('/user/:id', controller.edit); //Update user
app.delete('/user/:id', ); // Delete user  
app.post('/user/change-status', ); // Change user status 
app.post('/user/change-role', ); // Change user role   
app.post('/user/cart', ); // Add to cart 
app.get('/user/cart', ); // Get cart   
app.delete('/user/cart', ); // Clear cart
app.post('/user/order', ); // Place an order 
app.get('/user/order', ); // Get user orders 

module.exports = app;
