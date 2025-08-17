const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDb = require("./src/database/connect");
const authenticateToken = require("./src/middlewares/authenticateToken");

const user = require("./src/routes/user");
const task = require("./src/routes/task");
const auth = require("./src/routes/auth");

dotenv.config();
connectToDb();

//configuração de middlewares do Express para interpretar o corpo das requisições (req.body).
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//pre-fixo das routes
app.use("/user", user);
app.use("/task", authenticateToken, task);
app.use("/auth", auth);

//server
const PORT = 8090;
app.listen(PORT, () =>
  console.log(`Conectado com sucesso ao servidor na porta ${PORT}`)
);
