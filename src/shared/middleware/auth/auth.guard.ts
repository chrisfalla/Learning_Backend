import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../utils/security/jwt";

export const authGuard = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                message: "Authorization header missing",
            });
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                ok: false,
                message: "Invalid authorization format",
            });
        }

        const token = parts[1];
        const payload = verifyAccessToken(token);

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Invalid or expired token"
        })
    }
};