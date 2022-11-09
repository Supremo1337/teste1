function checkUserExists(req, res, next) {
    if (!req.body.name || !req.body.character || !req.body.role) {
      return res.status(400).json({ error: "data is required" });
      // middleware local que irá checar se a propriedade name foi infomada,
      // caso negativo, irá retornar um erro 400 - BAD REQUEST
    }
    if (!req.body.level) {
      return res.status(400).json({ error: "level is required" });
    }
    return next(); // se o nome for informado corretamente, a função next() chama as próximas ações
  }
  
  function checkUserInArray(req, res, next) {
    const geek = users[req.params.index];
    if (!geek) {
      return res.status(400).json({ error: "geek does not exists" });
    } // checa se o Geek existe no array, caso negativo informa que o index não existe no array
  
    req.geek = geek;
  
    return next();
  }