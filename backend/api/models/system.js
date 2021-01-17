const mongoose = require('mongoose')

const systemSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	currency: { type: String, required: true },
	fields: { type: Array, required: true },
	visible: { type: Boolean, required: true },
})

module.exports = mongoose.model('System', systemSchema) //El model es el constructor
