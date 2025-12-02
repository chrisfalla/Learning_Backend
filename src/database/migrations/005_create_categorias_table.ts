import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) UNIQUE NOT NULL,
        descripcion TEXT,
        padre_id INT REFERENCES categorias(id),
        slug VARCHAR(100) UNIQUE NOT NULL,
        imagen_url VARCHAR(500),
        orden INT DEFAULT 0,
        activa BOOLEAN DEFAULT TRUE
      )
    `);
    console.log('✅ Tabla categorias creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS categorias CASCADE');
    console.log('✅ Tabla categorias eliminada');
  } finally {
    client.release();
  }
};
