const express = require('express');
const app = express.Router();

const { get, getProfile } = require('../controllers/user.controller');


// ใช้ middleware `verifyToken` ในการตรวจสอบ token
app.get('/', get); // ใช้ middleware ตรวจสอบ token
app.get('/edit', getProfile); // ใช้ middleware ตรวจสอบ token

module.exports = app;
