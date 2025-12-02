import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS tokens_autenticacion (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        token_refresh TEXT NOT NULL,
        expira_en TIMESTAMP NOT NULL,
        revocado BOOLEAN DEFAULT FALSE,
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla tokens_autenticacion creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS tokens_autenticacion CASCADE');
    console.log('✅ Tabla tokens_autenticacion eliminada');
  } finally {
    client.release();
  }
};
