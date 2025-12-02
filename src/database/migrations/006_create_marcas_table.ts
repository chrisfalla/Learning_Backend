import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS marcas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) UNIQUE NOT NULL,
        descripcion TEXT,
        logo_url VARCHAR(500),
        sitio_web VARCHAR(255),
        activa BOOLEAN DEFAULT TRUE
      )
    `);
    console.log('✅ Tabla marcas creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS marcas CASCADE');
    console.log('✅ Tabla marcas eliminada');
  } finally {
    client.release();
  }
};
