const express = require('express');
const app = express.Router();

const controller = require('../controllers/user.controller');


// ใช้ middleware `verifyToken` ในการตรวจสอบ token
app.get('/users', controller.get); // Get all users  
app.get('/user/:id', controller.getById); //Get user by ID  
app.put('/user/:id', ); //Update user
app.delete('/user/:id', ); // Delete user  
app.post('/user/:id', ); // Change user status 
app.post('/user/:id', ); // Change user role   
app.post('/user/:id', ); // Add to cart 
app.get('/user/:id', ); // Get cart   
app.delete('/user/:id', ); // Clear cart
app.post('/user/:id', ); // Place an order 
app.get('/user/:id', ); // Get user orders 

module.exports = app;
