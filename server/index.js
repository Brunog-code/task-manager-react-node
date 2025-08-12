const express = require('express')
const app = express()
const cors = require('cors')

//configuração de middlewares do Express para interpretar o corpo das requisições (req.body).
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))




const PORT = 8090
app.listen(PORT, () => console.log(`Conecato com sucesso ao servidor na porta ${PORT}`))