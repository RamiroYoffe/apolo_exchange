const express = require('express')

const Currency = require('../models/currency')
const mongoose = require('mongoose')

exports.currency_get_all = (req, res, next) => {
	Currency.find()
		.exec()
		.then((docs) => {
			const response = {
				currencies: docs.map((doc) => {
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
exports.currency_get_one = (req, res, next) => {
	Currency.find({ name: req.params.name })
		.exec()
		.then((docs) => {
			const response = {
				currencies: docs.map((doc) => {
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

exports.currency_get_system = (req, res, next) => {
	Currency.find({ sistema: req.params.sistema })
		.exec()
		.then((docs) => {
			const response = {
				currencies: docs.map((doc) => {
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

exports.currency_create = (req, res, next) => {
	Currency.find({ name: req.body.name })
		.exec()
		.then((currencyExistente) => {
			if (currencyExistente.length > 0) {
				//si la currency existe:
				return res.status(409).json({
					message: 'This currency already exists',
				})
			} else {
				//crear la currency nueva
				const currency = new Currency({
					_id: new mongoose.Types.ObjectId(),
					name: req.body.name,
					value: req.body.value,
					system: req.body.system,
					visible: true,
				})
				currency.save().then((result) => {
					res.status(201).json({
						message: 'Currency succesfully added',
						name: result.name,
						value: result.value,
						system: result.system,
						visible: result.visible,
					})
				})
			}
		})
}

exports.currency_delete_name = (req, res, next) => {
	Currency.find({ name: req.params.name })
		.exec()
		.then((currencyEncontrada) => {
			if (currencyEncontrada.length > 0) {
				Currency.remove({ name: req.params.name })
					.exec()
					.then((currencyExistente) => {
						res.status(200).json({
							message: 'currency succesfully eliminated',
							result: currencyExistente,
						})
					})
			} else {
				return res.status(409).json({
					message: 'Currency not found',
				})
			}
		})
}

exports.currency_modify_value = (req, res, next) => {
	Currency.find({ name: req.params.name })
		.exec()
		.then((doc) => {
			if (doc.length > 0) {
				currencyEncontrada = doc[0]
				console.log(doc[0])
			} else {
				return res.status(500).json({
					message: 'Currency not found',
				})
			}
			Currency.update(
				{ _id: currencyEncontrada._id },
				{ $set: { value: req.body.value } }
			)
				.exec()
				.then((result) => {
					console.log(result)
					res.status(200).json({
						message: 'currency updated',
					})
				})
				.catch((err) => {
					res.status(500).json({
						error: err,
						message: 'Update failed ',
					})
				})
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			})
		})
}
