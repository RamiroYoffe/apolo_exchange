const mongoose = require('mongoose')

const monedaSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	nombre: { type: String, required: true },
	valor: { type: Number, required: true },
	visible: { type: Boolean, required: true },
})

module.exports = mongoose.model('Moneda', monedaSchema) //El model es el constructor
