const express = require('express')
const router = express.Router();
const User = require('../models/User.model')

router.post('/cadUser', async(req, res) => {
    try{
        //procurar email, se encontrar é porque está cadastrado
        const email = req.body.email
        const emailIsCad = await User.findOne({email})

        if(emailIsCad) return res.status(401).json({success: false, message: 'Email já cadastrado'})

        //se não existir continua
        const newUser = await User.create(req.body)
        return res.status(201).json({success: true, message: 'Cadastro realizado com sucesso', newUser})
    }catch(error){
        return res.status(500).json({success: false, message: 'Erro interno no servidor'})
    }
})

module.exports = router