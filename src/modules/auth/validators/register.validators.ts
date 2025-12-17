import { z } from "zod";
import { passwordBlacklist } from "../../../shared/utils/security/password-blacklist";
export const registerSchema = z.object({
    nombre: z
        .string()
        .min(2, "el nombre debe tener minimo 2 caracteres")
        .max(100, "el nommbre no puede superar los 100 cara "),

    apellido: z
        .string()
        .min(2, "el apellido debe tener minimo 2 caracteres")
        .max(100, "el apellido no puede superar los 100 caracteres"),

    correo: z
        .string()
        .email("el correo no es valido, virifique nuevamente")
        .max(200, "el correo es demasiado largo"),

    contraseña: z
        .string()
        .min(8, "lacontraseña debe incluir minimo 8 caracteres")
        .regex(/[A-Z]/, "debe incluir al menos una letra mayuscula")
        .regex(/[a-z]/, "debe incluir al menos una letra minuscula")
        .regex(/[0-9]/, "debe incluir al menos un numero")
        .refine(
            (value) => !passwordBlacklist.includes(value),
            { message: "la contraseña es demasiado comun y no es segura" }
        ),
});