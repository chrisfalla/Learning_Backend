import bcrypt from "bcryptjs";
import { usersModel } from "../models/users.model";

export const loginService = async (data: {
  email: string;
  password: string;
}) => {

  // 1. Buscar usuario
  const user = await usersModel.findByEmail(data.email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // 2. Verificar estado
  if (!user.active) {
    throw new Error("USER_INACTIVE");
  }

  // 3. Comparar contraseña
  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // 4. Login exitoso
  return {
    accesToken: "jwt",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  };
};
