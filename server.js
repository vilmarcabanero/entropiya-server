const env = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const errorHandler = require('./middleware/error')
const cors = require("cors");

const importData = require('./data.json')

//connect DB
connectDB()

const app = express() 
app.use(express.json())
app.use(cors());
//Connect our route
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

//Error Handler (Should be last piece of middleware)
app.use(errorHandler)

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/players', (req, res) => {
	res.send(importData)
})

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`)
	server.close(() => process.exit(1))
})
