//2-processa a redefinicao de senha(depois que clicou no email de redefinicao)
const User = require('../models/User.model');
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res, next) => {
    try{
        const {token, newPassword } = req.body;

        if(!token || !newPassword) {
            return res.status(400).json({success: false, message: 'Token e nova senha são obrigatórios'});
        }

         // gerar hash do token enviado para comparar com o hash no banco
        const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

        // procurar usuário com token válido e não expirado
        const user = await User.findOne({
            resetToken: resetTokenHash,
            resetTokenExpiration: { $gt: Date.now() } // verifica se o token não expirou
        })

        if(!user) {
            return res.status(400).json({success: false, message: 'Token inválido ou expirado'});
        }

        // criptografar nova senha com bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // remover token e expiração
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        await user.save();

        return res.status(200).json({success: true, message: 'Senha redefinida com sucesso'});

    }catch(error){
        console.error("Erro ao redefinir senha:", error);
        return res.status(500).json({success: false, message: 'Erro interno no servidor'});
    }
}

module.exports = resetPassword