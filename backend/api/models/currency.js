const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  system: { type: String, requirded: true },
  value: { type: Number, required: true },
  visible: { type: Boolean, required: true },
});

module.exports = mongoose.model("Currency", currencySchema); //El model es el constructor
