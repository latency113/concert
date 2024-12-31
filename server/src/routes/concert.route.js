const express = require('express')
const app = express.Router()

const controller = require('../controllers/concert.controller')
const { authCheck, adminCheck } = require('../middlewares/middleware')

//localhost:4000/products
app.get('/concerts', controller.get)
app.get('/concert/:id', controller.getById)
app.post('/concerts', adminCheck,controller.create)
app.put('/concert/:id', adminCheck,controller.updateCon)
app.delete('/concert/:id', adminCheck,controller.delete)

module.exports = app