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
<<<<<<< HEAD
//Connect our route
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
=======

//Connect our route
app.use('/auth', require('./routes/auth'))
app.use('/private', require('./routes/private'))
>>>>>>> 5e11db96500ba503979927124477addeb0e1751b

//Error Handler (Should be last piece of middleware)
app.use(errorHandler)

<<<<<<< HEAD


=======
>>>>>>> 5e11db96500ba503979927124477addeb0e1751b
app.get('/', (req, res) => {
	res.send('Hello World')
})

<<<<<<< HEAD
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/players', (req, res) => {
	res.send(importData)
})
=======
// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.get('/questions', (req, res) => {
// 	res.send(importData)
// })
>>>>>>> 5e11db96500ba503979927124477addeb0e1751b

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`)
	server.close(() => process.exit(1))
})
