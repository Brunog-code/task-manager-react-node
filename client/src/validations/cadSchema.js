import {z} from 'zod';

export const cadSchema = z.object({
    name: z.string().min(3, "Nome precisa ter no minimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha precisa ter no minimo 3 caracteres"),
    confirmPassword: z.string().min(6, "Confirme a senha")
}).refine(pass => pass.password === pass.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"]
})