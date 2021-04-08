import express from 'express' 
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'  
import studentRoutes from './routes/student.js'



const app = express()

app.use('/student', studentRoutes)

app.use(bodyParser.json({limit: '20mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}))

app.use(cors())

const CONNECTION_URL = 'mongodb+srv://vilmar-entropiya:entropiya2020@entropiya-free-cluster.vo2hc.mongodb.net/entropiya_first_database?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true, 
  useFindAndModify: true,
  useUnifiedTopology: true
}).then(() => app.listen(PORT, () => 
  console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)