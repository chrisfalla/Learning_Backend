import { ZodSchema } from "zod"
import { Request, Response, NextFunction } from "express"


export const validateRequest = (Schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = Schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                ok: false,
                message: "error de validacion",
                errors: result.error.flatten(),
            })
        }

        req.body = result.data;

        next();
    };
};