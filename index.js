const express = require('express')

const mongoose = require('./config/database')
const {userRouter} = require('./app/controllers/userController')

const app = express()
const port = 3003

app.use(express.json())
app.use('/users', userRouter)

app.listen(port, () =>{
    console.log('listening to port')
})