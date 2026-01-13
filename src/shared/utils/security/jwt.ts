import jwt, { JwtPayload as JwtLibPayload, Secret, SignOptions } from "jsonwebtoken";

const _JWT_SECRET = process.env.JWT_SECRET;
const _JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!_JWT_SECRET || !_JWT_EXPIRES_IN) {
  throw new Error("JWT configuration missing");
}

const JWT_SECRET: Secret = _JWT_SECRET;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  _JWT_EXPIRES_IN as unknown as SignOptions["expiresIn"];

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtLibPayload;

  return {
    id: decoded.id as number,
    email: decoded.email as string,
    role: decoded.role as string,
  };
};
