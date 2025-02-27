const express = require('express')
const app = express.Router()
const controller = require('../controllers/auth.controller')
const { authCheck, adminCheck } = require('../middlewares/middleware')

app.post('/register',controller.register)
app.post('/login',controller.login)
app.post('/current-user', authCheck, controller.currentUser)
app.post('/current-admin', authCheck, adminCheck ,controller.currentUser)


module.exports = app