const express = require('express');
const app = express.Router();
const controller = require('../controllers/user.controller');


app.get("/users", controller.getAllUsers);
app.get("/user/:id", controller.getUserById);
app.put("/user/:id", controller.updateUser);
app.delete("/user/:id", controller.deleteUser);
app.post("/change-status", controller.changeUserStatus);
app.post("/change-role", controller.changeUserRole);
app.post("/user/cart", controller.addToCart);
app.get("/user/cart", controller.getCart);
app.delete("/user/cart", controller.clearCart);
app.post("/user/order", controller.placeOrder);
app.get("/user/order", controller.getUserOrders);

module.exports = app;
