const express = require('express')
const colors = require('colors')
const dotenv = require("dotenv").config()
const PORT = process.env.PORT 
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.get('/',(req,res) => {
    res.send("heelo")
})

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))