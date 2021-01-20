const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	system1: { type: Object, required: true },
	system2: { type: Object, required: true },
	value: { type: Number, required: true },
})

module.exports = mongoose.model('Transaction', transactionSchema) //El model es el constructor
