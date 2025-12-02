import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS carritos (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id),
        sesion_id VARCHAR(100),
        estado VARCHAR(20) DEFAULT 'activo',
        creado_en TIMESTAMP DEFAULT NOW(),
        actualizado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla carritos creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS carritos CASCADE');
    console.log('✅ Tabla carritos eliminada');
  } finally {
    client.release();
  }
};
