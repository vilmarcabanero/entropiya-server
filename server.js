const env = require('dotenv').config()
const connectDB = require('./src/config/db')
const express = require('express')
const errorHandler = require('./src/middleware/error')

//connect DB
connectDB()

const app = express() 
app.use(express.json())
//Connect our route
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/private', require('./src/routes/private'))

//Error Handler (Should be last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`)
	server.close(() => process.exit(1))
})
