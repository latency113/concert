const express = require("express");
const app = express.Router();
const controller = require("../controllers/profile.controller");
const authenticate = require("../middleware/authenticate"); // Middleware สำหรับตรวจสอบ JWT

// ดึงข้อมูลโปรไฟล์
app.get("/", authenticate, controller.getProfile);

// อัปเดตข้อมูลโปรไฟล์
app.put("/", authenticate, controller.updateProfile);

module.exports = app;
