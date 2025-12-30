import bcrypt from "bcrypt";
import { usersModel } from "../models/users.model.ts"

const SALT_ROUNDS = 10;

export const registerService = async (data: {
    email: string,
    password: string,
    firstName: string,
    lastName: string;
}) => {

}