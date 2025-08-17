//rotas de autenticação
const express = require('express');
const router = express.Router();
const generateToken = require('../controllers/authController');
const User = require('../models/User.model'); 
const bcrypt = require('bcrypt');

// Rota para login
router.post('/login', async (req, res) => {

    //vem da req, quando usuario preenche o login
    const { email, password } = req.body;

    // verificar se o email existe
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    //verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    //user e senhna validados, gerar o token
    const token = generateToken(user);
    res.json({ token });
})