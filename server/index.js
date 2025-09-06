const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectToDb = require("./src/database/connect");
const authenticateToken = require("./src/middlewares/authenticateToken");

//Importando as rotas
const user = require("./src/routes/user");
const task = require("./src/routes/task");
const auth = require("./src/routes/auth");
const password = require("./src/routes/password");

// Conectando ao banco de dados
connectToDb();

//configuração de middlewares do Express para interpretar o corpo das requisições (req.body).
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//pre-fixo das routes
app.use("/user", user);
app.use("/tasks", authenticateToken, task);
app.use("/auth", auth);
app.use("/password", password);

//server
const PORT = process.env.PORT || 5000; //5000 só se não existir process.env.PORT
app.listen(PORT, () =>
  console.log(`Conectado com sucesso ao servidor na porta ${PORT}`)
);
