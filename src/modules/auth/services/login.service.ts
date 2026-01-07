import bcrypt from "bcrypt";
import { usersModel } from '../models/users.model';

export const loginService = async (data: {
    email: string;
    password: string;
}) => {
    //search user
    const user = await usersModel
}