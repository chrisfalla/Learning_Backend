import pool from "../../../database/config/database";

export const usuariosModel = {
    async findByEmail(correo: string) {

    },

    async createUsuario(data: {
        correo: string;
        contrasenaHash: string;
        nombre: string;
        apellido: string;
    }) {
        const query = `
        INSERT INTO usuarios (correo, constrasena_hash, nombre, apellido)
        VALUES ($1, $2, $3, $4)
        RETURNING id, correo, nombre, apellido, creado_en
        `;

        const result = await pool.query(query, [
            data.correo,
            data.contrasenaHash,
            data.nombre,
            data.apellido
        ]);

        return result.rows[0]
    }
};