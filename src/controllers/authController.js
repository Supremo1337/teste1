const router = require("express").Router();
const users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await users.findOne({ email }))
      return res.status(400).send({ error: "User already exists" });

    const user = await users.create(req.body);

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Registration Failed" });
  }
});

function generateToken(user = {}) {
  return jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ error: "User not found" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ erro: "invalid password" });

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = router;
