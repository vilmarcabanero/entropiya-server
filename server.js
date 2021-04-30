const env = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const app = express() 


//connect DB
connectDB()

app.use(express.json())
//Connect our route
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`)
	server.close(() => process.exit(1))
})
