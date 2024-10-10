import {z} from "zod"

export const SignInSchema= z.object({
    email: z.string().email("Deber ser un email válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(64, "La contraseña no puede tener más de 64 caracteres")
    .refine((value)=> /^[a-zA-Z0-9]*$/.test(value ?? ""), "La contraseña solo puede contener letras y números")

})