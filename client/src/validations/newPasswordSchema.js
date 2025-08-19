import {z} from "zod";

export const newPasswordSchema = z.object({
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação da senha deve ter pelo menos 6 caracteres")
}).refine(pass => pass.password === pass.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"]
})