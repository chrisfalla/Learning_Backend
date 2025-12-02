import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS notificaciones (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        tipo VARCHAR(50) NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        mensaje TEXT NOT NULL,
        leida BOOLEAN DEFAULT FALSE,
        metadata JSONB,
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla notificaciones creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS notificaciones CASCADE');
    console.log('✅ Tabla notificaciones eliminada');
  } finally {
    client.release();
  }
};
