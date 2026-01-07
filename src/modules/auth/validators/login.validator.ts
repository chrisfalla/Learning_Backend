import { z } from "zod";

export const loginValidator = z.object({
    email: z
        .string()
        .email("format to email invalid"),

    password: z
        .string()
        .min(8, "the password must have min 8 characteres")
        .max(100, "the password is too long"),
});