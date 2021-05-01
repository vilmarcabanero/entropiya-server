const mongoose = require('mongoose')

const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@entropiya-free-cluster.vo2hc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
mongoose

const connectDB = async () => {
	await mongoose
		.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
      useFindAndModify: true,
		})
		.then(() => {
			console.log('MongoDB connected')
		})
}

module.exports = connectDB

//mongodb connection
//mongodb+srv://<username>:<password>@entropiya-free-cluster.vo2hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//For local
//CONNECTION_URL = process.env.MONGO_URI