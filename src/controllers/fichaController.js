const router = require("express").Router();
const ficha = require("../models/ficha");
const users = require("../models/users");

router.post("/character", async (req, res) => {
  try {
    const { passAcess, account } = req.body; // assim esperamos buscar o name informado dentro do body da requisição
    const { name, character, origin, role, race, divinity, level } = account;
    const controllerAcess = await users.findOne({
      token: passAcess.replace('"', "").replace('"', ""),
    });
    const existed = await ficha.findById(controllerAcess.accountId);
    if(existed) return res.status(400).json({ error: true,  message:'Usuário já possuí uma conta criada em nosso sistema.'})
    const fichaCreate = await ficha.create({
      character: character,
      name: name,
      race: race,
      origin: origin,
      role: role,
      divinity: divinity,
      level: level,
      author: controllerAcess.email,
    });
    await controllerAcess.updateOne({ accountId: fichaCreate.id });
    return res.status(201).json({ error: false, data: req.body }); // retorna a informação da variavel users
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: true, err });
  }
});

router.get("/character/", async (req, res) => {
  try {
    let data = await ficha.findOne(req.body.email);
    if (!data) return res.status(400).json({ error: "Usuario não existe" });
    return res.status(200).json({ error: true, data });
  } catch (err) {
    res.status(400).json({ error: true, message: "params invalid" });
  }
}); // rota para listar todos os users

// router.get("/users/:index", checkUserInArray, (req, res) => {
//   return res.json(req.geek);
// });

router.put("/character/:id", async (req, res) => {
  console.log("ESSE É O REQ", req.body);
  const { name, character, origin, role, race, divinity, level } = req.body; // assim esperamos buscar o name informado dentro do body da requisição
  await ficha.findByIdAndUpdate(req.params.id, {
    character: character,
    name: name,
    race: race,
    origin: origin,
    role: role,
    divinity: divinity,
    level: level,
  });

  return res.status(200).json({}); // retorna a informação da variavel users
}); // retorna novamente os users atualizados após o update

router.delete("/character/:id", async (req, res) => {
  let data = await ficha.findByIdAndDelete(req.params.id);
  if (!data) return res.status(400).json({ error: "Usuario não existe" });
  return res.status(200).json(data);
}); // retorna os dados após exclusão

module.exports = router;
