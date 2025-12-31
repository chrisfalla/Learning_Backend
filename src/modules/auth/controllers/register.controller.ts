import { Request, Response } from "express";
import { registerService } from '../services/register.service';

export const registerController = async (
    req: Request,
    res: Response
) => {
    try {
        const user = await registerService(req.body);

        return res.status(201).json({
            ok: true,
            data: user,
        });
    } catch (error: any) {
        if (error.message === "email_already_exists") {
            return res.status(409).json({
                ok: false,
                message: "the email already register",
            });
        }
    }
    return res.status(500).json({
        ok: false,
        message: "error intern in to server"
    })
};