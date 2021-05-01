const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body

	try {
		const user = await User.create({
			username,
			email,
			password,
		})
		sendToken(user, 201, res)
	} catch (error) {
		// next(error)
		const user = await User.findOne({ username })
		if(user) {
			next(new ErrorResponse(`${username} is already taken. Please use another.`))
		}

		if(email) {
			next(new ErrorResponse(`${email} is already taken. Please use another.`))
		}
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
			return next(new ErrorResponse(`User does not exist`), 401)
		}

		//Invalid email to User does not exist

		const isMatch = await user.matchPasswords(password)

		if (!isMatch) {
			return next(new ErrorResponse('Invalid password'), 401)
		}

		sendToken(user, 200, res)
	} catch (error) {
		res.status(500).json({ sucess: false, error: error.message })
	}
}

exports.forgotpassword = async (req, res, next) => {
	const { email } = req.body

	try {
		const user = await User.findOne({ email })

		if (!user) {
			return next(new ErrorResponse('Email could not be sent'), 404)
		}

		const resetToken = user.getResetPasswordToken()

		await user.save()
		const resetUrl = `${process.env.ENTROPIYA_CLIENT_URL}/resetpassword/${resetToken}`

		const message = `
			<h1>You have requested a password reset</h1>
			<p>Please go to this link to reset your password</p>
			<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
		`

		console.log(resetToken)

		try {
			await sendEmail({
				to: user.email,
				subject: 'Password Reset Request',
				text: message
			})

			res.status(200).json({ success: true, data: 'Email Sent'})
		} catch (error) {
			user.resetPasswordToken = undefined
			user.resetPasswordExpire = undefined

			await user.save()

			return next(new ErrorResponse('Email could not be sent.', 500))
		}

	} catch (error) {
		next(error)
	}
}

//'Error with send email reset password, Error: self signed certificate in certificate chain, under review pa ang sendgrid account ko. Try next time or check the code difference baka may mali sa code ko.'

exports.resetpassword = async (req, res, next) => {
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now()}
		})

		if (!user) {
			return next(new ErrorResponse('Invalid Reset Token'), 400)
		}

		user.password = req.body.password
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		await user.save()
		res.status(201).json({
			sucess: true,
			data: "Password Reset Success",
		})
	} catch (error) {
		next(error)
	}
}

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken()
	res.status(statusCode).json({ sucess: true, token })
}
