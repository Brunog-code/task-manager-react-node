const User = require('../models/User.model')
const crypto = require("crypto");
const sendEmail = require('../services/emailService');

//1-funcao para solicitar redefinicao de senha
const forgotPassword = async(req, res) => {

    //pegar o email do usuario quando preencher o input
    try{
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: 'Usuário não encontrado'})
        }

         //gerar um token de redefinição aleatório
         const resetToken = crypto.randomBytes(32).toString("hex");

         // salvar hash do token (boa prática, em vez do token em texto puro)
         const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

         //atribuir o token de expiração ao usuário
         user.resetPasswordToken = resetTokenHash;
         user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
         await user.save();

         //montar link de redefinição de senha
         const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        //usar o emailService para enviar o email
        await sendEmail(
            user.email,
            "Redefinição de Senha",

            `<p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>Esse link expira em 1h.</p>
            <p>Se você não solicitou essa redefinição, ignore este email.</p>
            <img src="https://i.imgur.com/rnHrSYa.png" alt="Logo" style="width:150px; margin-top:10px;" />`
        );

         //resposta de sucesso
        return res.json({ success: true, message: "Email de redefinição enviado" });
    }catch(error){
         return res.status(500).json({success: false, message: 'Erro interno no servidor'})
    }
}

module.exports = forgotPassword
