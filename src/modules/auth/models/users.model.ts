import pool from "../../../database/config/database";

export const usersModel = {
    async findByEmail(email: string) {

    },

    async createUser(data: {
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
    }) {
        const query = `
        INSERT INTO users (email, password_hash, first_name, last_name)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, first_name, last_name, created_at
        `;

        const result = await pool.query(query, [
            data.email,
            data.passwordHash,
            data.firstName,
            data.lastName
        ]);

        return result.rows[0]
    }
};