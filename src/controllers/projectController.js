const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

router.get("/", (req, res) => {
  try {
    res.send({ ok: true, user: req.userId });
  } catch (err) {console.log(err)}
});

module.exports = router;
