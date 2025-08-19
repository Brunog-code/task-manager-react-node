const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../controllers/forgotPasswordController");
const resetPasswordController = require("../controllers/resetPasswordController");

// rota para solicitar redefinição de senha (manda email com token)
router.post("/forgot", forgotPasswordController);

// rota para redefinir senha (valida token e troca senha)
router.post("/reset/:token", resetPasswordController);

module.exports = router;
