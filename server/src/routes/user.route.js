const express = require('express');
const app = express.Router();
const controller = require('../controllers/user.controller');
const authenticate = require('../middleware/authenticate'); // Middleware ตรวจสอบ JWT

// ดึงข้อมูลผู้ใช้ทั้งหมด (จำกัดเฉพาะ admin หรือ roles ที่อนุญาต)
app.get('/', authenticate, controller.get);

// ดึงข้อมูลผู้ใช้ตาม ID
app.get('/:id', authenticate, controller.getById);

module.exports = app;
