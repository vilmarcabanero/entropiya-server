const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body

	try {
		const user = await User.create({
			username,
			email,
			password,
		})
		res.status(201).json({
			success: true,
			token: "23fef34f",
		})
	} catch (error) {
		next(error)
	}
}

exports.login = async (req, res, next) => {
	const { email, password } = req.body

	if (!email) {
		return next(new ErrorResponse('Please provide an email'), 400)
	}

	if (!password) {
		return next(new ErrorResponse('Please provide a password'), 400)
	}

	if (!email && !password) {
		return next(new ErrorResponse('Please provide an email and password'), 400)
	}

	try {
		const user = await User.findOne({ email }).select('+password')

		

		// if (!user && !isMatch) {
		// 	return next(new ErrorResponse('Invalid credentials'), 401)
		// }

		if (!user) {
			return next(new ErrorResponse('User does not exist'), 401)
		}

		//Invalid email to User does not exist

		const isMatch = await user.matchPasswords(password)

		if (!isMatch) {
			return next(new ErrorResponse('Invalid password'), 401)
		}

		res.status(200).json({
			success: true,
			token: 'tr34f3443fc',
		})
	} catch (error) {
		res.status(500).json({ sucess: false, error: error.message })
	}
}

exports.forgotpassword = (req, res, next) => {
	res.send('Forgot Password Route')
}

exports.resetpassword = (req, res, next) => {
	res.send('Reset Password Route')
}

// const sendToken = (user, statusCode, res) => {
// 	const token = 
// } 