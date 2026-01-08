import { Request, Response } from "express";
import { loginService } from "../services/login.service";

export const loginController = async (
    req: Request,
    res: Response
) => {
    try {
        const user = await loginService(req.body);

        return res.status(200).json({
            ok: true,
            data: user,
        });

    } catch (error: unknown) {

        if (error instanceof Error) {

            if (error.message === "INVALID_CREDENTIALS") {
                return res.status(401).json({
                    ok: false,
                    message: "Invalid credentials",
                });
            }

            if (error.message === "USER_INACTIVE") {
                return res.status(403).json({
                    ok: false,
                    message: "User is inactive",
                });
            }
        }

        // fallback SIEMPRE
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};
