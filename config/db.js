const mongoose = require('mongoose')

<<<<<<< HEAD

console.log(process.env.MONGO_DB_URI)
=======
// console.log(process.env.MONGO_DB_URI)
>>>>>>> 5e11db96500ba503979927124477addeb0e1751b

const connectDB = async () => {
	await mongoose
		.connect(process.env.MONGO_DB_URI, {
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