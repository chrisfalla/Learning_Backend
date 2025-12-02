import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS direcciones (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        tipo VARCHAR(20) DEFAULT 'envio',
        calle VARCHAR(255) NOT NULL,
        ciudad VARCHAR(100) NOT NULL,
        estado VARCHAR(100) NOT NULL,
        codigo_postal VARCHAR(20) NOT NULL,
        pais VARCHAR(100) NOT NULL,
        es_predeterminada BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('✅ Tabla direcciones creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS direcciones CASCADE');
    console.log('✅ Tabla direcciones eliminada');
  } finally {
    client.release();
  }
};
