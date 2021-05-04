const nodemailer = require('nodemailer')

const sendEmail = options => {
	const transporter = nodemailer.createTransport({
		secure: false,
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
		// tls: {
		// 	rejectUnauthorized: false,
		// }, 
	})

	// var transporter = nodemailer.createTransport(
	// 	smtpTransport({
	// 		host: 'outmail.abc.co.th', // hostname
	// 		secure: false, // use SSL
	// 		port: 25, // port for secure SMTP
	// 		auth: {
	// 			user: 'username@abc.co.th',
	// 			pass: 'passwordmail',
	// 		},
	// 		tls: {
	// 			rejectUnauthorized: false,
	// 		},
	// 	})
	// )

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: options.to,
		subject: options.subject,
		html: options.text,
	}

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err)
		} else {
			console.log(info)
		}
	})
}

module.exports = sendEmail
