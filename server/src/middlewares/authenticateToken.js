//middleware de autenticação de token
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  //se for enviado pela header do front
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = user; //adiciona o usuário decodificado ao objeto de requisição
    next(); //chama o próximo middleware ou rota
  });
};

module.exports = authenticateToken;
