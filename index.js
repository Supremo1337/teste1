const express = require('express');

const server = express();

server.use(express.json()); // faz com que o express entenda JSON

// Query params = ?teste=1
// Route params = /geeks/1
// Request body = { "name": "Brendon", "email": "brendon@email.com"}

// CRUD - Create, Read, Update, Delete

const users = [{name:'Cards', character: "Ash", origin: "", role: "", race: "", divinity: "", level: 4}, {name:'Supremo', character: "Mestre", origin: "", role: "", race: "", divinity: "", level: 0}];

server.use((req, res, next) => { // server.use cria o middleware global
  console.time('Request'); // marca o início da requisição
  console.log(`Método: ${req.method}; URL: ${req.url}; `); // retorna qual o método e url foi chamada

  next(); // função que chama as próximas ações 

  console.log('Finalizou'); // será chamado após a requisição ser concluída

  console.timeEnd('Request'); // marca o fim da requisição
});

function checkUserExists(req, res, next) {
  if (!req.body.name || !req.body.character || !req.body.role) {
    return res.status(400).json({ error: 'data is required' });
    // middleware local que irá checar se a propriedade name foi infomada, 
    // caso negativo, irá retornar um erro 400 - BAD REQUEST 
  }if(!req.body.level) {
    return res.status(400).json({ error: 'level is required' });
  }
  return next(); // se o nome for informado corretamente, a função next() chama as próximas ações
} 
  
function checkUserInArray(req, res, next) {
  const geek = users[req.params.index];
  if (!geek) {
    return res.status(400).json({ error: 'geek does not exists' });
  } // checa se o Geek existe no array, caso negativo informa que o index não existe no array

  req.geek = geek;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
}) // rota para listar todos os users

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.geek);
})

server.post('/users', checkUserExists, (req, res) => {
  const { name, character, origin, role, race, divinity, level } = req.body; // assim esperamos buscar o name informado dentro do body da requisição  
  users.push({name, character, origin, role, race, divinity, level});
  return res.json(users); // retorna a informação da variavel users
})

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params; // recupera o index com os dados
  const { name, character, origin, role, race, divinity, level } = req.body;
  users[index] = {name, character, origin, role, race, divinity, level}; // sobrepõe/edita o index obtido na rota de acordo com o novo valor
  return res.json(users);
}); // retorna novamente os users atualizados após o update

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params; // recupera o index com os dados

  users.splice(index, 1); // percorre o vetor até o index selecionado e deleta uma posição no array

  return res.send();
}); // retorna os dados após exclusão


server.listen(3003);