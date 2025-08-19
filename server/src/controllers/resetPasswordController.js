//2-processa a redefinicao de senha(depois que clicou no email de redefinicao)
const User = require('../models/User.model');
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    try{
        const {token} = req.params; // pegar o token da URL
        const { newPassword } = req.body;

        if(!token || !newPassword) {
            return res.status(400).json({success: false, message: 'Token e nova senha são obrigatórios'});
        }

         // gerar hash do token enviado para comparar com o hash no banco
        const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

        // procurar usuário com token válido e não expirado
        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpires: { $gt: Date.now() } // verifica se o token não expirou
        })

        if(!user) {
            return res.status(400).json({success: false, message: 'Token inválido ou expirado'});
        }

        //atribuir nova senha ao usuário
        user.password = newPassword;

        // remover token e expiração
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.status(200).json({success: true, message: 'Senha redefinida com sucesso'});

    }catch(error){
        console.error("Erro ao redefinir senha:", error);
        return res.status(500).json({success: false, message: 'Erro interno no servidor'});
    }
}

module.exports = resetPassword