import { z } from "zod";
import { passwordBlacklist } from "../../../shared/utils/security/password-blacklist";
export const registerSchema = z.object({
    firstName: z
        .string()
        .min(2, "first name must have at least 2 characters")
        .max(100, "first name cannot exceed 100 characters"),

    lastName: z
        .string()
        .min(2, "last name must have at least 2 characters")
        .max(100, "last name cannot exceed 100 characters"),

    email: z
        .string()
        .email("email is not valid, please check again")
        .max(200, "email is too long"),

    password: z
        .string()
        .min(8, "password must include at least 8 characters")
        .regex(/[A-Z]/, "must include at least one uppercase letter")
        .regex(/[a-z]/, "must include at least one lowercase letter")
        .regex(/[0-9]/, "must include at least one number")
        .refine(
            (value) => !passwordBlacklist.includes(value),
            { message: "password is too common and not secure" }
        ),
});