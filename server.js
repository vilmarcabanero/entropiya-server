const env = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const errorHandler = require('./middleware/error')

//connect DB
connectDB()

const app = express() 
app.use(express.json())
//Connect our route
app.use('/api/auth', require('./routes/auth'))

//Error Handler (Should be last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`)
	server.close(() => process.exit(1))
})