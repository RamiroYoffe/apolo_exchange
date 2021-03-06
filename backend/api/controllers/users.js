const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')

exports.user_get_all = (req, res, next) => {
	User.find()
		.exec()
		.then((docs) => {
			const response = {
				Users: docs.map((doc) => {
					return {
						doc,
					}
				}),
			}
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}

exports.user_get_mail = (req, res, next) => {
	User.find({ mail: res.locals.mail })
		.exec()
		.then((docs) => {
			const response = {
				User: docs.map((doc) => {
					return {
						doc,
					}
				}),
			}
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}

exports.user_register = (req, res, next) => {
	const id = new mongoose.Types.ObjectId()
	// let mailOptions = {
	//   // should be replaced with real recipient's account
	//   to: req.body.mail,
	//   subject: "Eatit - Verificacion de cuenta",
	//   text:
	//     "Para verificar tu cuenta visita:" +
	//     "https://eatit.com.ar/verify/?=" +
	//     id,
	// };
	User.find({ mail: req.body.mail })
		.exec()
		.then((userFound) => {
			if (userFound.length > 0) {
				return res.status(409).json({
					message: 'mail exists',
				})
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						})
					} else {
						const user = new User({
							_id: id,
							cbu: req.body.cbu,
							cuil: req.body.cuil,
							bank: req.body.bank,
							user_name: req.body.user_name,
							account_name: req.body.account_name,
							mail: req.body.mail,
							password: hash,
							orders: [],
						})

						user
							.save()
							.then((result) => {
								const token = jwt.sign(
									{
										mail: result.mail,
										userId: result._id,
									},
									'secret',
									{
										expiresIn: '1h',
									}
								)
								res.cookie('token', token, { httpOnly: true }).send()
							})
							.catch((err) => {
								console.log(err)
								res.status(500).json({
									error: err,
								})
							})
					}
				})
			}
		})
}

exports.user_Islogin = (req, res, next) => {
	res.status(200).json({
		Message: 'Still Logged In',
	})
}

exports.user_login = (req, res, next) => {
	User.find({ mail: req.body.mail })
		.exec()
		.then((usr) => {
			if (usr.length < 1) {
				// No existe el usuario
				return res.status(401).json({
					message: 'Auth failed -- NO EXISTE EL USUARIO',
				})
			}

			bcrypt.compare(req.body.password, usr[0].password, (err, result) => {
				if (result) {
					//si result = true es que la pass es correcta
					const token = jwt.sign(
						{
							mail: usr[0].mail,
							userId: usr[0]._id,
						},
						'secret',
						{
							expiresIn: '1h',
						}
					)
					res.status(200).json({
						message: 'Auth Succesful',
						token: token,
						user: {
							accountName: usr[0].account_name,
							userName: usr[0].user_name,
							mail: usr[0].mail,
							cbu: usr[0].cbu,
							cuil: usr[0].cuil,
							bank: usr[0].bank,
							orders: usr[0].orders,
						},
					})
				} else {
					res.status(401).json({ message: 'Auth Failed' })
				}
			})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}

//https://mongoosejs.com/docs/populate.html#setting-populated-fields  --> clave
//
