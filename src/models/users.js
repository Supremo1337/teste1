const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const users = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true, select: false },
  token: { type: String, default: '', required: false, select: false },
  accountId: { type: String, default: '', required: false, select: false },
});

users.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model("users", users);
