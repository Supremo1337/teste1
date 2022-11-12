const router = require("express").Router();
const { request, response } = require("express");
const ficha = require("./models/ficha");
const users = require("./models/users");
const authmeController = require("./controllers/authController");
router.use("/authme", authmeController);
const projectController = require("./controllers/projectController");
router.use("/", projectController);

router.post("/auth/users", async (req, res) => {
  const { email, password } = req.body;
  let data = await users.findOne({ email: email });
  if (data) {
    if (data.password == password)
      return res.status(200).json({ error: false, data });
  } else
    return res
      .status(404)
      .json({ error: true, message: "usuário não encontrado" });
}); // rota para listar todos os users

// router.get("/users/:index", checkUserInArray, (req, res) => {
//   return res.json(req.geek);
// });

router.post("/users", async (req, res) => {
  const { email, password } = req.body;
  let data = await users.findOne({ email: email });
  if (!data) {
    users.create({ email, password }).then((response) => console.log(response));
    return res.status(201).json({ email }); // retorna a informação da variavel users
  } else
    return res.status(400).json({ error: true, message: "email ja em uso" });
});

router.put("/users/:index", (req, res) => {
  const { index } = req.params; // recupera o index com os dados
  const { name, character, origin, role, race, divinity, level } = req.body;
  users[index] = { name, character, origin, role, race, divinity, level }; // sobrepõe/edita o index obtido na rota de acordo com o novo valor
  return res.json(users);
}); // retorna novamente os users atualizados após o update

router.delete("/users/:index", async (req, res) => {
  const { index } = req.params; // recupera o index com os dados
  let data = await ficha.findOne({ ...index });
  console.log("SOU O INDEX", index);
  if (data) {
    await ficha.deleteMany({ name: index });
    return res.status(202);
  }
  return res.status(404).json({ message: "usuario não encotrado" });
}); // retorna os dados após exclusão

module.exports = router;
