const express = require('express')

const colors = require('colors')
const dotenv = require("dotenv").config()
const PORT = process.env.PORT 
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Connect to MongoDB Database
connectDB()



// User routes
app.use('/api/users', require('./routes/userRoutes'))

// Error middleware
app.use(errorHandler)

// Start server
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))