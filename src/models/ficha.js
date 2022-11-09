const mongoose = require("mongoose");
const ficha = new mongoose.Schema({
  character: { type: String, required: true },
  name: { type: String, required: true },
  race: { type: String, required: true },
  origin: { type: String, required: true },
  role: { type: String, required: true },
  divinity: { type: String, required: false },
  level: { type: Number, required: true },
});
module.exports = mongoose.model("ficha", ficha);
