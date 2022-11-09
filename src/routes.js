const router = require("express").Router();
const ficha = require("./models/ficha");

router.get("/users/:username", async (req, res) => {
  let data = await ficha.findOne({ name: req.params.username });
  if (!data) return res.status(400).json({ error: "Usuario não existe" });
  return res.status(201).json(data);
}); // rota para listar todos os users

// router.get("/users/:index", checkUserInArray, (req, res) => {
//   return res.json(req.geek);
// });

router.post("/users", async (req, res) => {
  console.log("ESSE É O REQ", req.body);
  const { name, character, origin, role, race, divinity, level } = req.body; // assim esperamos buscar o name informado dentro do body da requisição
    await ficha.create({
      character: character,
      name: name,
      race: race,
      origin: origin,
      role: role,
      divinity: divinity,
      level: level,
    });

  return res.json(req.body); // retorna a informação da variavel users
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
