import bcrypt from "bcrypt";
import { usersModel } from "../models/users.model"

const SALT_ROUNDS = 10;

export const registerService = async (data: {
    email: string,
    password: string,
    firstName: string,
    lastName: string;
}) => {

    const existingUser = await usersModel.findByEmail(data.email);

    if (existingUser) {
        throw new Error("email_already_exists");
    }

    const passwordHash = await bcrypt.hash(
        data.password,
        SALT_ROUNDS
    );

    const newUser = await usersModel.createUser({
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
    });

    return {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
    };
};