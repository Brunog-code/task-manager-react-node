import {z} from 'zod'

export const loginSchema=z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, "Senha precisa ter no minimo 3 caracteres")
})