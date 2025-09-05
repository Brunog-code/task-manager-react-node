import { z } from "zod";

export const detailsSchema = z.object({
  description: z
    .string()
    .max(300, { message: "A descrição não pode ter mais que 300 caracteres." })
    .min(3, { message: "Digite pelo menos 3 caracteres." }),
});
