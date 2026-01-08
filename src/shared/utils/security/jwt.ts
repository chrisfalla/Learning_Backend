import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "15m";

interface JwtPayload {
    id: number;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};     